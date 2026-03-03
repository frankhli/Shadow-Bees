import { Pinecone } from '@pinecone-database/pinecone'
import { PrismaClient } from '@tiaohai/database/src/client'
import { OpenAI } from 'openai'

export interface RetrieveContextParams {
  query: string
  hotelId?: string
  language?: string
}

export interface RetrievedContext {
  documents: string[]
  history: Array<{ role: string; content: string }>
  sources: string[]
}

export class RAGService {
  private pinecone: Pinecone | null = null
  private prisma: PrismaClient | null = null
  private openai: OpenAI | null = null
  private indexName = 'tiaohai-knowledge'
  private isMockMode: boolean = false

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY
    this.isMockMode = !apiKey || apiKey === 'sk-demo-key-replace-with-real-key'
    
    // Try to initialize Prisma, but don't fail if not available
    try {
      this.prisma = new PrismaClient()
    } catch (error) {
      console.log('⚠️ RAG: Database not available')
    }
    
    // Initialize OpenAI if API key is available
    if (!this.isMockMode) {
      this.openai = new OpenAI({ apiKey })
    }
    
    // Initialize Pinecone if API key is available
    if (process.env.PINECONE_API_KEY) {
      try {
        this.pinecone = new Pinecone({
          apiKey: process.env.PINECONE_API_KEY,
        })
      } catch (error) {
        console.log('⚠️ RAG: Pinecone not available')
      }
    }
  }

  async retrieveContext(params: RetrieveContextParams): Promise<RetrievedContext> {
    const { query, hotelId, language = 'en' } = params

    // 1. Get recent conversation history
    const history = await this.getConversationHistory(params)

    // 2. Retrieve relevant documents from vector store
    let documents: string[] = []
    let sources: string[] = []

    if (this.pinecone && this.openai) {
      const vectorResults = await this.queryVectorStore(query, hotelId, language)
      documents = vectorResults.documents
      sources = vectorResults.sources
    } else if (this.prisma) {
      // Fallback: Query database directly
      const dbResults = await this.queryDatabase(query, hotelId, language)
      documents = dbResults.documents
      sources = dbResults.sources
    }

    // 3. Add hotel-specific context
    if (hotelId && this.prisma) {
      const hotelDocs = await this.getHotelSpecificDocs(hotelId, language)
      documents = [...documents, ...hotelDocs]
    }

    return {
      documents,
      history,
      sources,
    }
  }

  private async queryVectorStore(
    query: string,
    hotelId?: string,
    language?: string
  ): Promise<{ documents: string[]; sources: string[] }> {
    try {
      if (!this.pinecone || !this.openai) {
        return { documents: [], sources: [] }
      }

      // Generate embedding for query
      const embedding = await this.openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: query,
      })

      const index = this.pinecone.index(this.indexName)

      // Build metadata filter
      const filter: any = {}
      if (hotelId) filter.hotelId = hotelId
      if (language) filter.language = language

      // Query Pinecone
      const results = await index.query({
        vector: embedding.data[0].embedding,
        topK: 5,
        includeMetadata: true,
        filter: Object.keys(filter).length > 0 ? filter : undefined,
      })

      const documents: string[] = []
      const sources: string[] = []

      results.matches?.forEach((match) => {
        if (match.metadata?.content) {
          documents.push(String(match.metadata.content))
          sources.push(String(match.metadata.title || match.id))
        }
      })

      return { documents, sources }
    } catch (error) {
      console.error('Vector search error:', error)
      return { documents: [], sources: [] }
    }
  }

  private async queryDatabase(
    query: string,
    hotelId?: string,
    language?: string
  ): Promise<{ documents: string[]; sources: string[] }> {
    if (!this.prisma) {
      return { documents: [], sources: [] }
    }
    
    try {
      // Fallback: Use PostgreSQL full-text search
      const where: any = {
        isActive: true,
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { content: { contains: query, mode: 'insensitive' } },
        ],
      }

      if (hotelId) {
        where.OR.push(
          { hotelId },
          { hotelId: null } // General knowledge
        )
      }

      const docs = await this.prisma.knowledgeDocument.findMany({
        where,
        take: 5,
        orderBy: { updatedAt: 'desc' },
      })

      return {
        documents: docs.map((d) => language === 'zh' && d.content ? d.content : d.content),
        sources: docs.map((d) => d.title),
      }
    } catch (error) {
      console.error('Database query error:', error)
      return { documents: [], sources: [] }
    }
  }

  private async getHotelSpecificDocs(hotelId: string, language: string): Promise<string[]> {
    if (!this.prisma) return []
    
    try {
      const hotel = await this.prisma.hotel.findUnique({
        where: { id: hotelId },
        include: { roomTypes: true },
      })

      if (!hotel) return []

      const docs: string[] = []

      // Add facility information
      if (hotel.facilities) {
        const facilities = hotel.facilities as Record<string, boolean>
        
        if (!facilities.elevator) {
          docs.push(
            language === 'zh'
              ? '本酒店为传统建筑，没有电梯。但提供24小时行李搬运服务。1-3楼为客房，大堂在1楼。'
              : 'This is a traditional building without an elevator. However, we offer 24/7 luggage assistance. Rooms are on floors 1-3, reception is on the ground floor.'
          )
        }

        if (facilities.westernToilet) {
          docs.push(
            language === 'zh'
              ? '所有客房配备西式马桶。公共区域也有西式卫生间。'
              : 'All rooms have Western-style toilets. Western restrooms are also available in public areas.'
          )
        }
      }

      // Add room type information
      hotel.roomTypes.forEach((room) => {
        docs.push(
          `${room.nameEn}: ${room.roomCount} rooms available, ` +
          `inventory: OTA pool ${(room.inventoryPool as any)?.ota || 0}, ` +
          `Direct pool ${(room.inventoryPool as any)?.direct || 0}`
        )
      })

      return docs
    } catch (error) {
      console.error('Get hotel docs error:', error)
      return []
    }
  }

  private async getConversationHistory(
    params: RetrieveContextParams
  ): Promise<Array<{ role: string; content: string }>> {
    if (!this.prisma) return []
    
    try {
      // Get last 10 messages from this session
      const recentMessages = await this.prisma.aIConversation.findMany({
        where: { sessionId: params.query }, // Using query as sessionId for simplicity
        orderBy: { createdAt: 'desc' },
        take: 10,
      })

      return recentMessages
        .reverse()
        .map((m) => [
          { role: 'user', content: m.message },
          { role: 'assistant', content: m.response || '' },
        ])
        .flat()
    } catch (error) {
      return []
    }
  }

  // Method to add documents to vector store
  async addDocument(data: {
    title: string
    content: string
    contentEn?: string
    type: string
    hotelId?: string
    category?: string
  }) {
    if (!this.prisma) {
      console.log('Mock: Document would be added:', data.title)
      return { id: 'mock-id', ...data }
    }
    
    // Save to database
    const doc = await this.prisma.knowledgeDocument.create({
      data: {
        title: data.title,
        content: data.content,
        contentEn: data.contentEn,
        type: data.type as any,
        hotelId: data.hotelId,
        category: data.category,
        isActive: true,
      },
    })

    // If Pinecone is available, also add to vector store
    if (this.pinecone && this.openai) {
      try {
        const embedding = await this.openai.embeddings.create({
          model: 'text-embedding-3-small',
          input: data.contentEn || data.content,
        })

        const index = this.pinecone.index(this.indexName)
        
        await index.upsert([{
          id: doc.id,
          values: embedding.data[0].embedding,
          metadata: {
            title: data.title,
            content: data.contentEn || data.content,
            hotelId: data.hotelId,
            type: data.type,
            language: data.contentEn ? 'en' : 'zh',
          },
        }])
      } catch (error) {
        console.error('Pinecone upsert error:', error)
      }
    }

    return doc
  }
}
