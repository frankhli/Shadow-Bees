import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common'
import { GuidesService } from './guides.service'
import { CreateGuideDto } from './dto/create-guide.dto'
import { UpdateAvailabilityDto } from './dto/update-availability.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('guides')
export class GuidesController {
  constructor(private readonly guidesService: GuidesService) {}

  @Get()
  async findAll(
    @Query('city') city?: string,
    @Query('language') language?: string,
    @Query('date') date?: string
  ) {
    return this.guidesService.findAll({ city, language, date })
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.guidesService.findOne(id)
  }

  @Get(':id/availability')
  async getAvailability(@Param('id') id: string, @Query('month') month: string) {
    return this.guidesService.getAvailability(id, month)
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createGuideDto: CreateGuideDto) {
    return this.guidesService.create(createGuideDto)
  }

  @Post(':id/availability')
  @UseGuards(JwtAuthGuard)
  async updateAvailability(
    @Param('id') id: string,
    @Body() updateAvailabilityDto: UpdateAvailabilityDto
  ) {
    return this.guidesService.updateAvailability(id, updateAvailabilityDto)
  }
}
