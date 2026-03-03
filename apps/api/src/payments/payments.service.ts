import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Stripe from 'stripe'
import { PrismaClient, PaymentStatus } from '@tiaohai/database'

@Injectable()
export class PaymentsService {
  private stripe: Stripe
  private prisma: PrismaClient

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(
      this.configService.get<string>('STRIPE_SECRET_KEY') || '',
      { apiVersion: '2023-10-16' as any }
    )
    this.prisma = new PrismaClient()
  }

  async createPaymentIntent(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { hotel: true },
    })

    if (!order) {
      throw new Error('Order not found')
    }

    // Convert Decimal to number
    const totalAmount = Number(order.totalAmount)
    const platformFee = Number(order.platformFee)

    // Create Stripe PaymentIntent
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Convert to cents
      currency: order.currency.toLowerCase(),
      metadata: {
        orderId: order.id,
        orderNo: order.orderNo,
        hotelId: order.hotelId || '',
      },
      automatic_payment_methods: { enabled: true },
      // Platform fee handling (15% to platform, 85% to hotel)
      application_fee_amount: Math.round(platformFee * 100),
      transfer_data: {
        destination: (order.hotel?.pmsConfig as any)?.stripeAccountId || '',
      },
    })

    // Update order with payment intent ID
    await this.prisma.order.update({
      where: { id: orderId },
      data: {
        stripePaymentIntentId: paymentIntent.id,
        paymentStatus: PaymentStatus.PENDING,
      },
    })

    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    }
  }

  async confirmPayment(paymentIntentId: string) {
    const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId)

    if (paymentIntent.status === 'succeeded') {
      // Update order status
      await this.prisma.order.updateMany({
        where: { stripePaymentIntentId: paymentIntentId },
        data: {
          paymentStatus: PaymentStatus.PAID,
          paidAt: new Date(),
        },
      })

      return { status: 'success', paymentIntent }
    }

    return { status: paymentIntent.status, paymentIntent }
  }

  async refundPayment(orderId: string, amount?: number) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    })

    if (!order?.stripePaymentIntentId) {
      throw new Error('Payment not found')
    }

    const refund = await this.stripe.refunds.create({
      payment_intent: order.stripePaymentIntentId,
      amount: amount ? Math.round(amount * 100) : undefined,
    })

    await this.prisma.order.update({
      where: { id: orderId },
      data: { paymentStatus: PaymentStatus.REFUNDED },
    })

    return refund
  }

  async handleWebhook(payload: Buffer, signature: string) {
    const webhookSecret = this.configService.get<string>('STRIPE_WEBHOOK_SECRET')
    
    let event: Stripe.Event
    
    try {
      event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        webhookSecret || ''
      )
    } catch (err: any) {
      throw new Error(`Webhook signature verification failed: ${err.message}`)
    }

    // Handle events
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        await this.confirmPayment(paymentIntent.id)
        break
        
      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent
        await this.prisma.order.updateMany({
          where: { stripePaymentIntentId: failedPayment.id },
          data: { paymentStatus: PaymentStatus.FAILED },
        })
        break
    }

    return { received: true }
  }

  async createConnectedAccount(email: string) {
    const account = await this.stripe.accounts.create({
      type: 'express',
      email,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    })

    return account
  }

  async createAccountLink(accountId: string, refreshUrl: string, returnUrl: string) {
    const accountLink = await this.stripe.accountLinks.create({
      account: accountId,
      refresh_url: refreshUrl,
      return_url: returnUrl,
      type: 'account_onboarding',
    })

    return accountLink
  }
}
