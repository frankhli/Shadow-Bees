import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

interface WhatsAppMessage {
  to: string
  type: 'text' | 'template' | 'interactive'
  content: any
}

@Injectable()
export class WhatsAppService {
  private readonly logger = new Logger(WhatsAppService.name)
  private apiUrl = 'https://graph.facebook.com/v18.0'
  private accessToken: string
  private phoneNumberId: string

  constructor(private configService: ConfigService) {
    this.accessToken = this.configService.get<string>('WHATSAPP_API_TOKEN') || ''
    this.phoneNumberId = this.configService.get<string>('WHATSAPP_PHONE_NUMBER_ID') || ''
  }

  /**
   * Send a text message via WhatsApp
   */
  async sendTextMessage(to: string, message: string): Promise<boolean> {
    try {
      const response = await fetch(
        `${this.apiUrl}/${this.phoneNumberId}/messages`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: this.formatPhoneNumber(to),
            type: 'text',
            text: {
              body: message,
              preview_url: false,
            },
          }),
        }
      )

      if (!response.ok) {
        const error = await response.json()
        this.logger.error('WhatsApp API error:', error)
        return false
      }

      this.logger.log(`WhatsApp message sent to ${to}`)
      return true
    } catch (error) {
      this.logger.error('Failed to send WhatsApp message:', error)
      return false
    }
  }

  /**
   * Send booking confirmation template
   */
  async sendBookingConfirmation(
    to: string,
    data: {
      guestName: string
      orderNo: string
      hotelName: string
      checkIn: string
      checkOut: string
      totalAmount: number
    }
  ): Promise<boolean> {
    const message = `
🎉 *Booking Confirmed!*

Hello ${data.guestName},

Your reservation is confirmed:

*Order:* ${data.orderNo}
*Hotel:* ${data.hotelName}
*Check-in:* ${data.checkIn}
*Check-out:* ${data.checkOut}
*Total:* $${data.totalAmount}

📍 Add your AI Concierge for travel tips:
https://tiaohai.com/ai/${data.orderNo}

Safe travels!
*Team Tiaohai*
    `.trim()

    return this.sendTextMessage(to, message)
  }

  /**
   * Send payment reminder
   */
  async sendPaymentReminder(
    to: string,
    data: {
      guestName: string
      orderNo: string
      amount: number
      paymentLink: string
    }
  ): Promise<boolean> {
    const message = `
⏰ *Payment Reminder*

Hello ${data.guestName},

Your booking *${data.orderNo}* is awaiting payment.

*Amount due:* $${data.amount}

Complete payment: ${data.paymentLink}

Questions? Reply here to chat with our AI Concierge.
    `.trim()

    return this.sendTextMessage(to, message)
  }

  /**
   * Send check-in reminder (24h before)
   */
  async sendCheckInReminder(
    to: string,
    data: {
      guestName: string
      hotelName: string
      hotelAddress: string
      checkInTime: string
      aiLink: string
    }
  ): Promise<boolean> {
    const message = `
🏨 *Check-in Tomorrow!*

Hello ${data.guestName},

Your stay at *${data.hotelName}* is tomorrow!

📍 *Address:* ${data.hotelAddress}
🕐 *Check-in:* ${data.checkInTime}

💡 *Travel Tips:*
• Have your passport ready for registration
• Tap water is not drinkable
• Download WeChat for mobile payments

💬 Questions? Chat with AI Concierge:
${data.aiLink}

Looking forward to your stay!
    `.trim()

    return this.sendTextMessage(to, message)
  }

  /**
   * Send AI concierge response
   */
  async sendAIResponse(
    to: string,
    question: string,
    answer: string
  ): Promise<boolean> {
    const message = `
💬 *Tiaohai Concierge*

You asked: "${question}"

${answer}

---
Need more help? Type "human" to speak with our team.
    `.trim()

    return this.sendTextMessage(to, message)
  }

  /**
   * Send escalation notification (to guest)
   */
  async sendEscalationNotice(
    to: string,
    data: {
      guestName: string
      estimatedResponseTime: string
    }
  ): Promise<boolean> {
    const message = `
👋 *Hi ${data.guestName}*

I've forwarded your question to our local expert team.

⏱️ *Expected response:* ${data.estimatedResponseTime}

For emergencies, please call:
• Police: 110
• Ambulance: 120
• Tourist Hotline: 12301

Thank you for your patience!
    `.trim()

    return this.sendTextMessage(to, message)
  }

  /**
   * Handle incoming webhook from WhatsApp
   */
  async handleWebhook(payload: any): Promise<any> {
    try {
      const entry = payload.entry?.[0]
      const changes = entry?.changes?.[0]
      const value = changes?.value
      const messages = value?.messages

      if (!messages || messages.length === 0) {
        return { status: 'no_messages' }
      }

      const message = messages[0]
      const from = message.from
      const messageType = message.type

      this.logger.log(`Received WhatsApp ${messageType} from ${from}`)

      // Process based on message type
      switch (messageType) {
        case 'text':
          return this.handleTextMessage(from, message.text.body)
        
        case 'interactive':
          return this.handleInteractiveMessage(from, message.interactive)
        
        case 'button':
          return this.handleButtonMessage(from, message.button)
        
        default:
          this.logger.log(`Unhandled message type: ${messageType}`)
          return { status: 'unhandled_type' }
      }
    } catch (error) {
      this.logger.error('Webhook processing error:', error)
      return { status: 'error', error: error.message }
    }
  }

  private async handleTextMessage(from: string, text: string) {
    // Forward to AI service
    const sessionId = `whatsapp_${from}`
    
    try {
      const response = await fetch(
        `${this.configService.get('AI_SERVICE_URL')}/api/v1/ai/chat`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text,
            sessionId,
            channel: 'whatsapp',
            language: this.detectLanguage(text),
          }),
        }
      )

      const aiResponse = await response.json()

      // Send response back via WhatsApp
      await this.sendAIResponse(from, text, aiResponse.response)

      // If escalated, send escalation notice
      if (aiResponse.escalatedToHuman) {
        await this.sendEscalationNotice(from, {
          guestName: 'there',
          estimatedResponseTime: 'within 4 hours',
        })
      }

      return { status: 'processed' }
    } catch (error) {
      this.logger.error('AI service error:', error)
      await this.sendTextMessage(
        from,
        "I'm having trouble right now. A human agent will contact you soon."
      )
      return { status: 'error' }
    }
  }

  private async handleInteractiveMessage(from: string, interactive: any) {
    // Handle button replies, list selections, etc.
    this.logger.log('Interactive message:', interactive)
    return { status: 'processed' }
  }

  private async handleButtonMessage(from: string, button: any) {
    // Handle quick reply buttons
    this.logger.log('Button message:', button)
    return { status: 'processed' }
  }

  private formatPhoneNumber(phone: string): string {
    // Remove any non-digit characters and ensure it has country code
    const cleaned = phone.replace(/\D/g, '')
    if (!cleaned.startsWith('1') && cleaned.length === 10) {
      return `1${cleaned}` // Add US country code
    }
    return cleaned
  }

  private detectLanguage(text: string): string {
    // Simple language detection - in production use a library
    const hasChinese = /[\u4e00-\u9fa5]/.test(text)
    if (hasChinese) return 'zh'
    
    const hasSpanish = /[áéíóúñ¿¡]/i.test(text)
    if (hasSpanish) return 'es'
    
    return 'en'
  }
}
