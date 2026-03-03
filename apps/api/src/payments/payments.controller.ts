import { Controller, Post, Body, Headers, Req, RawBody } from '@nestjs/common'
import { Request } from 'express'
import { PaymentsService } from './payments.service'

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-intent')
  async createPaymentIntent(@Body('orderId') orderId: string) {
    return this.paymentsService.createPaymentIntent(orderId)
  }

  @Post('confirm')
  async confirmPayment(@Body('paymentIntentId') paymentIntentId: string) {
    return this.paymentsService.confirmPayment(paymentIntentId)
  }

  @Post('refund')
  async refundPayment(
    @Body('orderId') orderId: string,
    @Body('amount') amount?: number
  ) {
    return this.paymentsService.refundPayment(orderId, amount)
  }

  @Post('webhook')
  async handleWebhook(
    @RawBody() payload: Buffer,
    @Headers('stripe-signature') signature: string
  ) {
    return this.paymentsService.handleWebhook(payload, signature)
  }

  // Stripe Connect for hotels
  @Post('connect-account')
  async createConnectedAccount(@Body('email') email: string) {
    return this.paymentsService.createConnectedAccount(email)
  }

  @Post('account-link')
  async createAccountLink(
    @Body('accountId') accountId: string,
    @Body('refreshUrl') refreshUrl: string,
    @Body('returnUrl') returnUrl: string
  ) {
    return this.paymentsService.createAccountLink(accountId, refreshUrl, returnUrl)
  }
}
