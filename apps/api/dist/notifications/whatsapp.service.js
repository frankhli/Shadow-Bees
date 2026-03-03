"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var WhatsAppService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let WhatsAppService = WhatsAppService_1 = class WhatsAppService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(WhatsAppService_1.name);
        this.apiUrl = 'https://graph.facebook.com/v18.0';
        this.accessToken = this.configService.get('WHATSAPP_API_TOKEN') || '';
        this.phoneNumberId = this.configService.get('WHATSAPP_PHONE_NUMBER_ID') || '';
    }
    async sendTextMessage(to, message) {
        try {
            const response = await fetch(`${this.apiUrl}/${this.phoneNumberId}/messages`, {
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
            });
            if (!response.ok) {
                const error = await response.json();
                this.logger.error('WhatsApp API error:', error);
                return false;
            }
            this.logger.log(`WhatsApp message sent to ${to}`);
            return true;
        }
        catch (error) {
            this.logger.error('Failed to send WhatsApp message:', error);
            return false;
        }
    }
    async sendBookingConfirmation(to, data) {
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
    `.trim();
        return this.sendTextMessage(to, message);
    }
    async sendPaymentReminder(to, data) {
        const message = `
⏰ *Payment Reminder*

Hello ${data.guestName},

Your booking *${data.orderNo}* is awaiting payment.

*Amount due:* $${data.amount}

Complete payment: ${data.paymentLink}

Questions? Reply here to chat with our AI Concierge.
    `.trim();
        return this.sendTextMessage(to, message);
    }
    async sendCheckInReminder(to, data) {
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
    `.trim();
        return this.sendTextMessage(to, message);
    }
    async sendAIResponse(to, question, answer) {
        const message = `
💬 *Tiaohai Concierge*

You asked: "${question}"

${answer}

---
Need more help? Type "human" to speak with our team.
    `.trim();
        return this.sendTextMessage(to, message);
    }
    async sendEscalationNotice(to, data) {
        const message = `
👋 *Hi ${data.guestName}*

I've forwarded your question to our local expert team.

⏱️ *Expected response:* ${data.estimatedResponseTime}

For emergencies, please call:
• Police: 110
• Ambulance: 120
• Tourist Hotline: 12301

Thank you for your patience!
    `.trim();
        return this.sendTextMessage(to, message);
    }
    async handleWebhook(payload) {
        try {
            const entry = payload.entry?.[0];
            const changes = entry?.changes?.[0];
            const value = changes?.value;
            const messages = value?.messages;
            if (!messages || messages.length === 0) {
                return { status: 'no_messages' };
            }
            const message = messages[0];
            const from = message.from;
            const messageType = message.type;
            this.logger.log(`Received WhatsApp ${messageType} from ${from}`);
            switch (messageType) {
                case 'text':
                    return this.handleTextMessage(from, message.text.body);
                case 'interactive':
                    return this.handleInteractiveMessage(from, message.interactive);
                case 'button':
                    return this.handleButtonMessage(from, message.button);
                default:
                    this.logger.log(`Unhandled message type: ${messageType}`);
                    return { status: 'unhandled_type' };
            }
        }
        catch (error) {
            this.logger.error('Webhook processing error:', error);
            return { status: 'error', error: error.message };
        }
    }
    async handleTextMessage(from, text) {
        const sessionId = `whatsapp_${from}`;
        try {
            const response = await fetch(`${this.configService.get('AI_SERVICE_URL')}/api/v1/ai/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: text,
                    sessionId,
                    channel: 'whatsapp',
                    language: this.detectLanguage(text),
                }),
            });
            const aiResponse = await response.json();
            await this.sendAIResponse(from, text, aiResponse.response);
            if (aiResponse.escalatedToHuman) {
                await this.sendEscalationNotice(from, {
                    guestName: 'there',
                    estimatedResponseTime: 'within 4 hours',
                });
            }
            return { status: 'processed' };
        }
        catch (error) {
            this.logger.error('AI service error:', error);
            await this.sendTextMessage(from, "I'm having trouble right now. A human agent will contact you soon.");
            return { status: 'error' };
        }
    }
    async handleInteractiveMessage(from, interactive) {
        this.logger.log('Interactive message:', interactive);
        return { status: 'processed' };
    }
    async handleButtonMessage(from, button) {
        this.logger.log('Button message:', button);
        return { status: 'processed' };
    }
    formatPhoneNumber(phone) {
        const cleaned = phone.replace(/\D/g, '');
        if (!cleaned.startsWith('1') && cleaned.length === 10) {
            return `1${cleaned}`;
        }
        return cleaned;
    }
    detectLanguage(text) {
        const hasChinese = /[\u4e00-\u9fa5]/.test(text);
        if (hasChinese)
            return 'zh';
        const hasSpanish = /[áéíóúñ¿¡]/i.test(text);
        if (hasSpanish)
            return 'es';
        return 'en';
    }
};
exports.WhatsAppService = WhatsAppService;
exports.WhatsAppService = WhatsAppService = WhatsAppService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], WhatsAppService);
//# sourceMappingURL=whatsapp.service.js.map