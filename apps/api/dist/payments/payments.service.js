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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const stripe_1 = require("stripe");
const database_1 = require("@tiaohai/database");
let PaymentsService = class PaymentsService {
    constructor(configService) {
        this.configService = configService;
        this.stripe = new stripe_1.default(this.configService.get('STRIPE_SECRET_KEY') || '', { apiVersion: '2023-10-16' });
        this.prisma = new database_1.PrismaClient();
    }
    async createPaymentIntent(orderId) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
            include: { hotel: true },
        });
        if (!order) {
            throw new Error('Order not found');
        }
        const totalAmount = Number(order.totalAmount);
        const platformFee = Number(order.platformFee);
        const paymentIntent = await this.stripe.paymentIntents.create({
            amount: Math.round(totalAmount * 100),
            currency: order.currency.toLowerCase(),
            metadata: {
                orderId: order.id,
                orderNo: order.orderNo,
                hotelId: order.hotelId || '',
            },
            automatic_payment_methods: { enabled: true },
            application_fee_amount: Math.round(platformFee * 100),
            transfer_data: {
                destination: order.hotel?.pmsConfig?.stripeAccountId || '',
            },
        });
        await this.prisma.order.update({
            where: { id: orderId },
            data: {
                stripePaymentIntentId: paymentIntent.id,
                paymentStatus: database_1.PaymentStatus.PENDING,
            },
        });
        return {
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
        };
    }
    async confirmPayment(paymentIntentId) {
        const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);
        if (paymentIntent.status === 'succeeded') {
            await this.prisma.order.updateMany({
                where: { stripePaymentIntentId: paymentIntentId },
                data: {
                    paymentStatus: database_1.PaymentStatus.PAID,
                    paidAt: new Date(),
                },
            });
            return { status: 'success', paymentIntent };
        }
        return { status: paymentIntent.status, paymentIntent };
    }
    async refundPayment(orderId, amount) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
        });
        if (!order?.stripePaymentIntentId) {
            throw new Error('Payment not found');
        }
        const refund = await this.stripe.refunds.create({
            payment_intent: order.stripePaymentIntentId,
            amount: amount ? Math.round(amount * 100) : undefined,
        });
        await this.prisma.order.update({
            where: { id: orderId },
            data: { paymentStatus: database_1.PaymentStatus.REFUNDED },
        });
        return refund;
    }
    async handleWebhook(payload, signature) {
        const webhookSecret = this.configService.get('STRIPE_WEBHOOK_SECRET');
        let event;
        try {
            event = this.stripe.webhooks.constructEvent(payload, signature, webhookSecret || '');
        }
        catch (err) {
            throw new Error(`Webhook signature verification failed: ${err.message}`);
        }
        switch (event.type) {
            case 'payment_intent.succeeded':
                const paymentIntent = event.data.object;
                await this.confirmPayment(paymentIntent.id);
                break;
            case 'payment_intent.payment_failed':
                const failedPayment = event.data.object;
                await this.prisma.order.updateMany({
                    where: { stripePaymentIntentId: failedPayment.id },
                    data: { paymentStatus: database_1.PaymentStatus.FAILED },
                });
                break;
        }
        return { received: true };
    }
    async createConnectedAccount(email) {
        const account = await this.stripe.accounts.create({
            type: 'express',
            email,
            capabilities: {
                card_payments: { requested: true },
                transfers: { requested: true },
            },
        });
        return account;
    }
    async createAccountLink(accountId, refreshUrl, returnUrl) {
        const accountLink = await this.stripe.accountLinks.create({
            account: accountId,
            refresh_url: refreshUrl,
            return_url: returnUrl,
            type: 'account_onboarding',
        });
        return accountLink;
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map