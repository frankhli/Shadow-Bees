import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { WebhooksController } from './webhooks.controller'
import { WebhooksService } from './webhooks.service'
import { InventoryModule } from '../inventory/inventory.module'
import { HotelsModule } from '../hotels/hotels.module'

@Module({
  imports: [ConfigModule, InventoryModule, HotelsModule],
  controllers: [WebhooksController],
  providers: [WebhooksService],
})
export class WebhooksModule {}
