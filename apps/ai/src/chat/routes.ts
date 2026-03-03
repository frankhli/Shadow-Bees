import { FastifyInstance } from 'fastify'
import { ChatService } from './chat.service'

const chatService = new ChatService()

export async function chatRoutes(fastify: FastifyInstance) {
  // HTTP endpoint for chat
  fastify.post('/chat', async (request, reply) => {
    const { message, sessionId, guestId, hotelId, language = 'en' } = request.body as any

    try {
      const response = await chatService.processMessage({
        message,
        sessionId,
        guestId,
        hotelId,
        language,
      })

      return response
    } catch (error: any) {
      fastify.log.error(error)
      return reply.status(500).send({
        error: 'AI service error',
        message: 'Please try again or contact support',
        escalation: true,
      })
    }
  })

  // WebSocket endpoint for real-time chat
  fastify.get('/chat/stream', { websocket: true }, (connection, req) => {
    connection.socket.on('message', async (message: string) => {
      try {
        const data = JSON.parse(message)
        const { text, sessionId, guestId, hotelId, language = 'en' } = data

        // Stream response
        const stream = await chatService.streamMessage({
          message: text,
          sessionId,
          guestId,
          hotelId,
          language,
        })

        for await (const chunk of stream) {
          connection.socket.send(JSON.stringify({
            type: 'chunk',
            content: chunk,
          }))
        }

        connection.socket.send(JSON.stringify({ type: 'done' }))
      } catch (error: any) {
        connection.socket.send(JSON.stringify({
          type: 'error',
          error: error.message,
        }))
      }
    })
  })

  // Get conversation history
  fastify.get('/conversations/:sessionId', async (request) => {
    const { sessionId } = request.params as any
    return chatService.getConversationHistory(sessionId)
  })

  // Get pending escalations (for human agents)
  fastify.get('/escalations', async () => {
    return chatService.getPendingEscalations()
  })

  // Human takeover
  fastify.post('/takeover/:sessionId', async (request) => {
    const { sessionId } = request.params as any
    const { agentId } = request.body as any
    return chatService.humanTakeover(sessionId, agentId)
  })
}
