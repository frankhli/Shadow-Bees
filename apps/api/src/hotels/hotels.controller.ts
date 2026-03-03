import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common'
import { HotelsService } from './hotels.service'
import { CreateHotelDto } from './dto/create-hotel.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Get()
  async findAll(@Query('city') city?: string, @Query('page') page = 1) {
    return this.hotelsService.findAll({ city, page: Number(page) })
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.hotelsService.findOne(id)
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createHotelDto: CreateHotelDto) {
    // TODO: 从 JWT token 获取实际用户ID
    return this.hotelsService.create({ ...createHotelDto, userId: 'temp-user-id' })
  }
}
