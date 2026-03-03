import { Controller, Post, Body, Get, Query } from '@nestjs/common'
import { DispatchService } from './dispatch.service'

@Controller('dispatch')
export class DispatchController {
  constructor(private readonly dispatchService: DispatchService) {}

  @Post('find-guide')
  async findGuide(@Body() data: {
    city: string
    date: string
    languages: string[]
    serviceType?: string
  }) {
    return this.dispatchService.findBestGuide(data)
  }

  @Post('assign')
  async assignGuide(@Body() data: {
    orderId: string
    guideId: string
  }) {
    return this.dispatchService.assignGuide(data.orderId, data.guideId)
  }

  @Get('algorithm-test')
  async testAlgorithm(
    @Query('city') city: string,
    @Query('date') date: string,
    @Query('language') language: string
  ) {
    return this.dispatchService.findBestGuide({
      city,
      date,
      languages: [language],
    })
  }
}
