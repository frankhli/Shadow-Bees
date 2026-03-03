import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common'
import { InventoryService } from './inventory.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get(':hotelId')
  @UseGuards(JwtAuthGuard)
  async getAvailability(
    @Param('hotelId') hotelId: string,
    @Query('roomTypeId') roomTypeId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string
  ) {
    return this.inventoryService.getAvailability(hotelId, roomTypeId, startDate, endDate)
  }

  @Post(':hotelId/update')
  @UseGuards(JwtAuthGuard)
  async updateInventory(
    @Param('hotelId') hotelId: string,
    @Body() data: {
      roomTypeId: string
      date: string
      availability: { ota: number; direct: number }
    }
  ) {
    return this.inventoryService.updateInventory(
      hotelId,
      data.roomTypeId,
      data.date,
      data.availability
    )
  }

  @Get(':hotelId/sync-history')
  @UseGuards(JwtAuthGuard)
  async getSyncHistory(@Param('hotelId') hotelId: string, @Query('limit') limit?: string) {
    return this.inventoryService.getSyncHistory(hotelId, limit ? parseInt(limit) : 50)
  }
}
