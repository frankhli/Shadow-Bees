import Fastify from 'fastify'
import cors from '@fastify/cors'
import websocket from '@fastify/websocket'
import dotenv from 'dotenv'
import { chatRoutes } from './chat/routes'
import { webhookRoutes } from './webhooks/routes'

dotenv.config()

const fastify = Fastify({
  logger: true,
})

async function main() {
  // Register plugins
  await fastify.register(cors, {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  })

  await fastify.register(websocket)

  // Register routes
  await fastify.register(chatRoutes, { prefix: '/api/v1/ai' })
  await fastify.register(webhookRoutes, { prefix: '/webhooks' })

  // Health check
  fastify.get('/health', async () => {
    return { status: 'ok', service: 'ai' }
  })

  // Start server
  const PORT = parseInt(process.env.AI_SERVICE_PORT || '3002')

  try {
    await fastify.listen({ port: PORT, host: '0.0.0.0' })
    console.log(`🤖 AI Service running on http://localhost:${PORT}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

main()
