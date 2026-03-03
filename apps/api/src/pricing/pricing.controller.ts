import { Controller, Get, Post, Query, Body } from '@nestjs/common'
import { PricingService } from './pricing.service'

@Controller('pricing')
export class PricingController {
  constructor(private readonly pricingService: PricingService) {}

  @Get('calculate')
  async calculatePrice(
    @Query('hotelId') hotelId: string,
    @Query('roomTypeId') roomTypeId: string,
    @Query('date') date: string,
    @Query('guestNationality') guestNationality?: string
  ) {
    return this.pricingService.calculatePrice({
      hotelId,
      roomTypeId,
      date,
      guestNationality,
    })
  }

  @Post('batch-calculate')
  async batchCalculate(@Body() data: {
    hotelId: string
    roomTypeId: string
    startDate: string
    endDate: string
  }) {
    return this.pricingService.batchCalculate(
      data.hotelId,
      data.roomTypeId,
      data.startDate,
      data.endDate
    )
  }

  @Get('factors')
  async getPricingFactors() {
    return this.pricingService.getPricingFactors()
  }
}
