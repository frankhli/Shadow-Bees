import { Module } from '@nestjs/common'
import { PmsController } from './pms.controller'
import { PmsService } from './pms.service'
import { CloudbedsService } from './cloudbeds.service'
import { InventoryModule } from '../inventory/inventory.module'

@Module({
  imports: [InventoryModule],
  controllers: [PmsController],
  providers: [PmsService, CloudbedsService],
  exports: [PmsService, CloudbedsService],
})
export class PmsModule {}
