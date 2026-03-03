import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { AIService } from './ai.service';
import { GenerateContentDto } from './dto/generate-content.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('ai')
export class AIController {
  constructor(private readonly aiService: AIService) {}

  @Post('generate')
  @UseGuards(JwtAuthGuard)
  async generateContent(@Body() dto: GenerateContentDto) {
    return this.aiService.generateContent({
      hotel_name: dto.hotel_name,
      city: dto.city,
      facilities: dto.facilities,
      platform: dto.platform,
      style: dto.style,
      language: dto.language,
    });
  }

  @Get('templates')
  @UseGuards(JwtAuthGuard)
  async getTemplates() {
    return this.aiService.getTemplates();
  }
}
