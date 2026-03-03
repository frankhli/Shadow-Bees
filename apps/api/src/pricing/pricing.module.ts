import { Module } from '@nestjs/common'
import { PricingController } from './pricing.controller'
import { PricingService } from './pricing.service'
import { InventoryModule } from '../inventory/inventory.module'

@Module({
  imports: [InventoryModule],
  controllers: [PricingController],
  providers: [PricingService],
  exports: [PricingService],
})
export class PricingModule {}
