import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PmsService } from './pms.service';

@Controller('pms')
export class PmsController {
  constructor(private readonly pmsService: PmsService) {}

  @Get('status')
  async getStatus() {
    return this.pmsService.getStatus();
  }
}
