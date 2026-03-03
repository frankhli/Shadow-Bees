import { OpenAI } from 'openai'
import { PrismaClient, AIChannel } from '@tiaohai/database/src/client'
import { RAGService } from '../rag/rag.service'

export interface ChatMessage {
  message: string
  sessionId: string
  guestId?: string
  hotelId?: string
  language?: string
}

export interface AIResponse {
  response: string
  intent: string
  confidenceScore: number
  escalatedToHuman: boolean
  sources?: string[]
}

// Mock responses for development without OpenAI API key
const MOCK_RESPONSES: Record<string, Record<string, string>> = {
  en: {
    pricing: "Our room rates start from ¥380/night. Each room includes breakfast, WiFi, and air conditioning. Would you like me to check availability for your dates? 🏨",
    facility: "We have all the essentials: WiFi, AC, hot water 24/7. The building has an elevator. Western-style toilets are in every room. Need anything else? 🛎️",
    booking: "I can help you book! Just tell me your check-in/check-out dates and room preference. You can also check availability on our website. 📅",
    policy: "Check-in is from 2 PM, check-out by 12 PM. Free cancellation up to 24 hours before arrival. Need more details? 📋",
    nearby: "Great question! We're close to the subway (5-min walk) and many local restaurants. I recommend the night market just 10 minutes away. Want a guided tour? 🗺️",
    cultural: "Tap water isn't drinkable in China - we provide bottled water daily. Also, bring toilet paper when going out! Any other cultural tips you need? 🎎",
    other: "Thanks for your message! I'm here to help with anything about your stay in China. What can I assist you with? 😊",
    emergency: "🚨 Emergency Contacts:\n• Police: 110\n• Ambulance: 120\n• Fire: 119\n• Tourist Hotline: 12301\n\nI'm connecting you to our emergency support team right now.",
  },
  es: {
    pricing: "Nuestras habitaciones desde ¥380/noche. Incluyen desayuno, WiFi y aire acondicionado. ¿Quieres que verifique disponibilidad? 🏨",
    facility: "Tenemos todo lo esencial: WiFi, AC, agua caliente 24/7. El edificio tiene ascensor. ¿Necesitas algo más? 🛎️",
    booking: "¡Puedo ayudarte a reservar! Dime tus fechas de entrada/salida. También puedes verificar disponibilidad en nuestra web. 📅",
    policy: "Check-in desde 14h, check-out antes de 12h. Cancelación gratuita hasta 24h antes. ¿Necesitas más detalles? 📋",
    nearby: "¡Buena pregunta! Estamos cerca del metro (5 min) y restaurantes locales. Recomiendo el mercado nocturno a 10 min. ¿Quieres un tour guiado? 🗺️",
    cultural: "El agua del grifo no es potable en China - proporcionamos agua embotellada. ¡Lleva papel higiénico al salir! 🎎",
    other: "¡Gracias por tu mensaje! Estoy aquí para ayudar con todo sobre tu estadía en China. ¿En qué puedo ayudarte? 😊",
    emergency: "🚨 Contactos de emergencia:\n• Policía: 110\n• Ambulancia: 120\n• Bomberos: 119\n• Línea turística: 12301\n\nTe conecto con nuestro equipo de emergencia ahora.",
  },
  fr: {
    pricing: "Nos chambres à partir de ¥380/nuit. Petit-déjeuner, WiFi et clim inclus. Voulez-vous que je vérifie les disponibilités? 🏨",
    facility: "Nous avons l'essentiel: WiFi, clim, eau chaude 24/7. L'immeuble a un ascenseur. Besoin d'autre chose? 🛎️",
    booking: "Je peux vous aider à réserver! Dites-moi vos dates. Vous pouvez aussi vérifier les disponibilités sur notre site. 📅",
    policy: "Check-in à 14h, check-out avant 12h. Annulation gratuite jusqu'à 24h avant. Besoin de plus de détails? 📋",
    nearby: "Bonne question! Nous sommes près du métro (5 min) et restaurants locaux. Je recommande le marché de nuit à 10 min. Tour guidé? 🗺️",
    cultural: "L'eau du robinet n'est pas potable en Chine - nous fournissons de l'eau en bouteille. Emportez du papier toilette en sortant! 🎎",
    other: "Merci pour votre message! Je suis là pour vous aider avec votre séjour en Chine. Que puis-je faire pour vous? 😊",
    emergency: "🚨 Contacts d'urgence:\n• Police: 110\n• Ambulance: 120\n• Pompiers: 119\n• Hotline touristique: 12301\n\nJe vous connecte à notre équipe d'urgence maintenant.",
  },
  de: {
    pricing: "Unsere Zimmer ab ¥380/Nacht. Frühstück, WLAN und Klimaanlage inklusive. Soll ich die Verfügbarkeit prüfen? 🏨",
    facility: "Wir haben das Wesentliche: WLAN, Klima, warmes Wasser 24/7. Das Gebäude hat einen Aufzug. Brauchen Sie noch etwas? 🛎️",
    booking: "Ich kann Ihnen bei der Buchung helfen! Sagen Sie mir Ihre Termine. Sie können auch auf unserer Website verfügbarkeiten prüfen. 📅",
    policy: "Check-in ab 14 Uhr, Check-out bis 12 Uhr. Kostenlose Stornierung bis 24h vorher. Mehr Details nötig? 📋",
    nearby: "Gute Frage! Wir sind nah zur U-Bahn (5 Min) und lokalen Restaurants. Ich empfehle den Nachtmarkt in 10 Min. Geführte Tour? 🗺️",
    cultural: "Leitungswasser in China nicht trinkbar - wir stellen Flaschenwasser. Nehmen Sie Toilettenpapier mit wenn Sie rausgehen! 🎎",
    other: "Danke für Ihre Nachricht! Ich helfe Ihnen gerne bei Ihrem Aufenthalt in China. Womit kann ich Ihnen helfen? 😊",
    emergency: "🚨 Notfallkontakte:\n• Polizei: 110\n• Krankenwagen: 120\n• Feuerwehr: 119\n• Touristen-Hotline: 12301\n\nIch verbinde Sie jetzt mit unserem Notfallteam.",
  },
}

export class ChatService {
  private openai: OpenAI | null = null
  private prisma: PrismaClient | null = null
  private ragService: RAGService
  private isMockMode: boolean
  private isDbAvailable: boolean = false

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY
    this.isMockMode = !apiKey || apiKey === 'sk-demo-key-replace-with-real-key'
    
    if (!this.isMockMode) {
      this.openai = new OpenAI({ apiKey })
    } else {
      console.log('🤖 AI Service running in MOCK mode (no OpenAI API key)')
    }
    
    // Try to initialize Prisma, but don't fail if not available
    try {
      this.prisma = new PrismaClient()
      this.isDbAvailable = true
    } catch (error) {
      console.log('⚠️ Database not available, running in memory-only mode')
      this.isDbAvailable = false
    }
    
    this.ragService = new RAGService()
  }

  async processMessage(data: ChatMessage): Promise<AIResponse> {
    const { message, sessionId, guestId, hotelId, language = 'en' } = data

    // Mock mode - return predefined responses
    if (this.isMockMode) {
      return this.processMockMessage(data)
    }

    // 1. Intent Recognition
    const intent = await this.classifyIntent(message)
    
    // 2. Check for emergency keywords (immediate escalation)
    if (this.isEmergency(message)) {
      await this.saveConversation({
        sessionId,
        guestId,
        message,
        response: '',
        intent: 'emergency',
        confidenceScore: 1.0,
        escalatedToHuman: true,
        hotelId,
      })
      
      await this.notifyHumanAgent(sessionId, 'emergency', message)
      
      return {
        response: this.getEmergencyResponse(language),
        intent: 'emergency',
        confidenceScore: 1.0,
        escalatedToHuman: true,
      }
    }

    // 3. Retrieve relevant context (RAG)
    const context = await this.ragService.retrieveContext({
      query: message,
      hotelId,
      language,
    })

    // 4. Get hotel details if applicable
    let hotelContext = ''
    if (hotelId) {
      const hotel = await this.prisma.hotel.findUnique({
        where: { id: hotelId },
        include: { roomTypes: true },
      })
      if (hotel) {
        hotelContext = this.formatHotelContext(hotel)
      }
    }

    // 5. Generate response with GPT-4o
    const systemPrompt = this.buildSystemPrompt(language, hotelContext)
    
    const messages: any[] = [
      { role: 'system', content: systemPrompt },
      ...context.history.map((h: any) => ({
        role: h.role,
        content: h.content,
      })),
      { role: 'user', content: message },
    ]

    if (context.documents.length > 0) {
      messages.splice(1, 0, {
        role: 'system',
        content: `Relevant information: ${context.documents.join('\n')}`,
      })
    }

    const completion = await this.openai!.chat.completions.create({
      model: 'gpt-4o',
      messages,
      temperature: 0.7,
      max_tokens: 300,
    })

    const response = completion.choices[0]?.message?.content || ''
    
    // 6. Calculate confidence score
    const confidenceScore = await this.calculateConfidence(message, response, intent)

    // 7. Check if escalation needed
    const shouldEscalate = this.shouldEscalate(message, response, confidenceScore)

    // 8. Save conversation
    await this.saveConversation({
      sessionId,
      guestId,
      message,
      response,
      intent,
      confidenceScore,
      escalatedToHuman: shouldEscalate,
      hotelId,
    })

    // 9. Escalate if needed
    if (shouldEscalate) {
      await this.notifyHumanAgent(sessionId, intent, message)
    }

    return {
      response,
      intent,
      confidenceScore,
      escalatedToHuman: shouldEscalate,
      sources: context.sources,
    }
  }

  // Mock message processing for development
  private async processMockMessage(data: ChatMessage): Promise<AIResponse> {
    const { message, sessionId, guestId, hotelId, language = 'en' } = data
    
    const intent = this.classifyIntentMock(message)
    const isEmergency = this.isEmergency(message)
    
    const responses = MOCK_RESPONSES[language] || MOCK_RESPONSES.en
    let response = responses[intent] || responses.other
    
    if (isEmergency) {
      response = responses.emergency
    }
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const confidenceScore = isEmergency ? 1.0 : 0.85
    const shouldEscalate = isEmergency || this.shouldEscalate(message, response, confidenceScore)

    await this.saveConversation({
      sessionId,
      guestId,
      message,
      response,
      intent: isEmergency ? 'emergency' : intent,
      confidenceScore,
      escalatedToHuman: shouldEscalate,
      hotelId,
    })

    if (shouldEscalate) {
      await this.notifyHumanAgent(sessionId, intent, message)
    }

    return {
      response: `[MOCK] ${response}`,
      intent: isEmergency ? 'emergency' : intent,
      confidenceScore,
      escalatedToHuman: shouldEscalate,
      sources: [],
    }
  }

  // Simple mock intent classification
  private classifyIntentMock(message: string): string {
    const lower = message.toLowerCase()
    
    if (lower.match(/price|cost|how much|expensive|cheap|¥|\$/)) return 'pricing'
    if (lower.match(/elevator|toilet|wifi|shower|room|facility|amenity/)) return 'facility'
    if (lower.match(/book|reservation|availability|check in|check out|date/)) return 'booking'
    if (lower.match(/cancel|policy|rule|refund|terms/)) return 'policy'
    if (lower.match(/near|close|restaurant|attraction|place|visit|subway|metro|map/)) return 'nearby'
    if (lower.match(/culture|custom|tip|advice|water|toilet paper|tradition/)) return 'cultural'
    
    return 'other'
  }

  async *streamMessage(data: ChatMessage): AsyncGenerator<string> {
    const { message, sessionId, guestId, hotelId, language = 'en' } = data

    // Mock mode - stream predefined response
    if (this.isMockMode) {
      const intent = this.classifyIntentMock(message)
      const responses = MOCK_RESPONSES[language] || MOCK_RESPONSES.en
      const response = responses[intent] || responses.other
      
      // Stream word by word with small delays
      const words = response.split(' ')
      let fullResponse = '[MOCK] '
      
      for (const word of words) {
        await new Promise(resolve => setTimeout(resolve, 50))
        fullResponse += word + ' '
        yield word + ' '
      }

      await this.saveConversation({
        sessionId,
        guestId,
        message,
        response: fullResponse.trim(),
        intent,
        confidenceScore: 0.8,
        escalatedToHuman: false,
        hotelId,
      })
      return
    }

    const systemPrompt = this.buildSystemPrompt(language)
    
    const stream = await this.openai!.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
      temperature: 0.7,
      max_tokens: 300,
      stream: true,
    })

    let fullResponse = ''
    
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || ''
      fullResponse += content
      yield content
    }

    // Save after streaming completes
    await this.saveConversation({
      sessionId,
      guestId,
      message,
      response: fullResponse,
      intent: 'streaming',
      confidenceScore: 0.8,
      escalatedToHuman: false,
      hotelId,
    })
  }

  private async classifyIntent(message: string): Promise<string> {
    if (this.isMockMode) {
      return this.classifyIntentMock(message)
    }

    const completion = await this.openai!.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Classify the user intent into one of these categories:
- pricing (price inquiries)
- facility (hotel amenities, elevator, toilet)
- booking (reservation questions)
- policy (visa, cancellation, rules)
- emergency (urgent help needed)
- nearby (attractions, restaurants)
- cultural (customs, tips)
- other

Respond with just the category name.`,
        },
        { role: 'user', content: message },
      ],
      temperature: 0,
      max_tokens: 20,
    })

    return completion.choices[0]?.message?.content?.trim().toLowerCase() || 'other'
  }

  private isEmergency(message: string): boolean {
    const emergencyKeywords = [
      'emergency', 'hospital', 'police', 'accident', 'urgent', 'help',
      '医生', '医院', '警察', '急救', '紧急', '报警', '受伤', 'injured',
    ]
    
    const lowerMessage = message.toLowerCase()
    return emergencyKeywords.some(keyword => lowerMessage.includes(keyword))
  }

  private shouldEscalate(message: string, response: string, confidence: number): boolean {
    // Explicit human request
    const humanKeywords = ['human', 'manager', 'agent', 'person', 'speak to', 'talk to']
    if (humanKeywords.some(k => message.toLowerCase().includes(k))) {
      return true
    }

    // Low confidence
    if (confidence < 0.7) {
      return true
    }

    // Complex booking modifications
    if (message.toLowerCase().includes('cancel') && message.toLowerCase().includes('refund')) {
      return true
    }

    return false
  }

  private async calculateConfidence(message: string, response: string, intent: string): Promise<number> {
    // Simple heuristic - can be improved with a dedicated model
    let confidence = 0.8

    // Lower confidence for certain intents
    if (intent === 'emergency') confidence = 0.9
    if (intent === 'other') confidence = 0.6

    // Lower confidence for very short or long responses
    if (response.length < 20) confidence -= 0.1
    if (response.length > 500) confidence -= 0.1

    // Check for uncertainty phrases
    const uncertaintyPhrases = ['not sure', 'don\'t know', 'unclear', 'maybe', 'perhaps']
    if (uncertaintyPhrases.some(p => response.toLowerCase().includes(p))) {
      confidence -= 0.2
    }

    return Math.max(0, Math.min(1, confidence))
  }

  private buildSystemPrompt(language: string, hotelContext?: string): string {
    const basePrompt = `You are Tiaohai Concierge, an AI assistant for international travelers staying at Chinese boutique hotels.

CORE RULES:
1. BE HONEST: If the hotel has no elevator, explicitly say so. Never hide inconveniences.
2. BE PROACTIVE: Offer solutions (e.g., "No elevator, but we offer free luggage carry service").
3. CULTURAL BRIDGE: Explain Chinese customs briefly (e.g., "Tap water is not drinkable in China, we provide bottled water").
4. SAFETY FIRST: For emergencies, immediately provide emergency contacts and offer human handover.
5. CONVERSION: Naturally suggest experiences (e.g., "Would you like a Hutong walking tour with our local guide?").

RESPONSE FORMAT:
- Keep under 100 words
- Use friendly, conversational tone like a local friend, not robotic hotel staff
- Include specific data (distances, prices) when available
- Use emojis sparingly (max 1-2)`

    const hotelSection = hotelContext ? `\n\nHOTEL CONTEXT:\n${hotelContext}` : ''
    
    const languageInstruction = language !== 'en' 
      ? `\n\nRespond in ${language} language.` 
      : ''

    return basePrompt + hotelSection + languageInstruction
  }

  private formatHotelContext(hotel: any): string {
    const facilities = Object.entries(hotel.facilities || {})
      .filter(([_, v]) => v)
      .map(([k]) => k)
      .join(', ')

    return `
- Hotel: ${hotel.name} (${hotel.nameEn})
- City: ${hotel.city}
- Facilities: ${facilities || 'Basic amenities'}
- Address: ${hotel.address}
${!hotel.facilities?.elevator ? '- IMPORTANT: No elevator in building' : ''}
${hotel.facilities?.westernToilet ? '- Western-style toilets available' : ''}
`
  }

  private getEmergencyResponse(language: string): string {
    const responses: Record<string, string> = {
      en: `🚨 Emergency Contacts:
• Police: 110
• Ambulance: 120
• Fire: 119
• Tourist Hotline: 12301

I'm connecting you to our emergency support team right now. They will contact you within 5 minutes.`,
      es: `🚨 Contactos de emergencia:
• Policía: 110
• Ambulancia: 120
• Bomberos: 119
• Línea turística: 12301

Te estoy conectando con nuestro equipo de emergencia ahora mismo.`,
      fr: `🚨 Contacts d'urgence:
• Police: 110
• Ambulance: 120
• Pompiers: 119
• Hotline touristique: 12301

Je vous connecte à notre équipe d'urgence maintenant.`,
      de: `🚨 Notfallkontakte:
• Polizei: 110
• Krankenwagen: 120
• Feuerwehr: 119
• Touristen-Hotline: 12301

Ich verbinde Sie jetzt mit unserem Notfallteam.`,
    }
    return responses[language] || responses.en
  }

  private async saveConversation(data: any) {
    if (!this.isDbAvailable || !this.prisma) {
      console.log('💾 Mock save conversation:', { sessionId: data.sessionId, message: data.message.substring(0, 50) + '...' })
      return
    }
    
    try {
      await this.prisma.aIConversation.create({
        data: {
          sessionId: data.sessionId,
          guestId: data.guestId,
          channel: AIChannel.WEB,
          message: data.message,
          response: data.response,
          intent: data.intent,
          confidenceScore: data.confidenceScore,
          escalatedToHuman: data.escalatedToHuman,
          hotelId: data.hotelId,
        },
      })
    } catch (error) {
      console.log('⚠️ Failed to save conversation:', error)
    }
  }

  private async notifyHumanAgent(sessionId: string, reason: string, message: string) {
    // TODO: Implement notification (email, SMS, Slack)
    console.log(`🚨 Escalation: ${sessionId} - ${reason} - ${message}`)
  }

  async getConversationHistory(sessionId: string) {
    if (!this.isDbAvailable || !this.prisma) {
      return []
    }
    
    return this.prisma.aIConversation.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'asc' },
      take: 50,
    })
  }

  async getPendingEscalations() {
    if (!this.isDbAvailable || !this.prisma) {
      return []
    }
    
    return this.prisma.aIConversation.findMany({
      where: {
        escalatedToHuman: true,
        humanHandledBy: null,
      },
      orderBy: { createdAt: 'desc' },
      include: {
        guest: {
          select: { name: true, phone: true },
        },
      },
    })
  }

  async humanTakeover(sessionId: string, agentId: string) {
    if (!this.isDbAvailable || !this.prisma) {
      return { success: true, mock: true }
    }
    
    await this.prisma.aIConversation.updateMany({
      where: { sessionId },
      data: {
        humanHandledBy: agentId,
        escalatedAt: new Date(),
      },
    })

    return { success: true }
  }
}
