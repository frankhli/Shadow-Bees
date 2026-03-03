import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common'
import { ExperiencesService } from './experiences.service'
import { CreateExperienceDto } from './dto/create-experience.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('experiences')
export class ExperiencesController {
  constructor(private readonly experiencesService: ExperiencesService) {}

  @Get()
  async findAll(
    @Query('city') city?: string,
    @Query('type') type?: string
  ) {
    return this.experiencesService.findAll({ city, type })
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.experiencesService.findOne(id)
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createExperienceDto: CreateExperienceDto) {
    return this.experiencesService.create(createExperienceDto)
  }
}
