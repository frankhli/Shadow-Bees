import { FastifyInstance } from 'fastify'
import { ChatService } from '../chat/chat.service'

const chatService = new ChatService()

export async function webhookRoutes(fastify: FastifyInstance) {
  // WhatsApp Business API webhook
  fastify.post('/whatsapp', async (request, reply) => {
    const body = request.body as any

    try {
      // Parse WhatsApp message
      const message = body.messages?.[0]
      if (!message) {
        return reply.status(200).send({ status: 'no_message' })
      }

      const fromNumber = message.from
      const text = message.text?.body || ''

      // Get or create session
      const sessionId = `whatsapp_${fromNumber}`

      // Process with AI
      const response = await chatService.processMessage({
        message: text,
        sessionId,
        language: 'en', // TODO: Detect language
      })

      // TODO: Send response back via WhatsApp API
      console.log(`WhatsApp response to ${fromNumber}: ${response.response}`)

      return reply.status(200).send({ status: 'processed' })
    } catch (error: any) {
      fastify.log.error(error)
      return reply.status(500).send({ error: error.message })
    }
  })

  // WhatsApp verification webhook
  fastify.get('/whatsapp', async (request, reply) => {
    // Verify webhook for WhatsApp Business API setup
    const mode = request.query['hub.mode']
    const token = request.query['hub.verify_token']
    const challenge = request.query['hub.challenge']

    const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN

    if (mode === 'subscribe' && token === verifyToken) {
      return reply.status(200).send(challenge)
    }

    return reply.status(403).send({ error: 'Verification failed' })
  })
}
