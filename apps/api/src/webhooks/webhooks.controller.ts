import { Controller, Post, Body, Headers } from '@nestjs/common'
import { WebhooksService } from './webhooks.service'

@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  // Cloudbeds webhook endpoint
  @Post('cloudbeds')
  async handleCloudbedsWebhook(
    @Body() payload: any,
    @Headers('x-cloudbeds-signature') signature: string
  ) {
    return this.webhooksService.handleCloudbedsWebhook(payload, signature)
  }

  // Generic PMS webhook endpoint
  @Post('pms/:provider')
  async handlePMSWebhook(
    @Body() payload: any,
    @Headers() headers: any
  ) {
    return this.webhooksService.handleGenericPMSWebhook(payload, headers)
  }
}
