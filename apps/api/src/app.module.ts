import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { HotelsModule } from './hotels/hotels.module'
import { GuidesModule } from './guides/guides.module'
import { ExperiencesModule } from './experiences/experiences.module'
import { OrdersModule } from './orders/orders.module'
import { PaymentsModule } from './payments/payments.module'
import { InventoryModule } from './inventory/inventory.module'
import { WebhooksModule } from './webhooks/webhooks.module'
import { AIModule } from './ai/ai.module'
import { HealthModule } from './health/health.module'
import { SocialModule } from './social/social.module'
import { ChatModule } from './chat/chat.module'
import { ReviewsModule } from './reviews/reviews.module'
import { MockDataModule } from './mock-data/mock-data.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    HotelsModule,
    GuidesModule,
    ExperiencesModule,
    OrdersModule,
    PaymentsModule,
    InventoryModule,
    WebhooksModule,
    AIModule,
    HealthModule,
    SocialModule,
    ChatModule,
    ReviewsModule,
    MockDataModule,
  ],
})
export class AppModule {}
