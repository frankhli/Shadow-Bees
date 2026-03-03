import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common'
import { SocialService } from './social.service'
import { CreateEventDto } from './dto/create-event.dto'
import { CreateRoomShareDto } from './dto/create-room-share.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('social')
export class SocialController {
  constructor(private readonly socialService: SocialService) {}

  // ========== Events ==========
  
  @Get('events')
  async findEvents(
    @Query('city') city?: string,
    @Query('type') type?: string,
    @Query('date') date?: string
  ) {
    return this.socialService.findEvents({ city, type, date })
  }

  @Get('events/:id')
  async findEventById(@Param('id') id: string) {
    return this.socialService.findEventById(id)
  }

  @Post('events')
  @UseGuards(JwtAuthGuard)
  async createEvent(@Body() createEventDto: CreateEventDto) {
    return this.socialService.createEvent(createEventDto)
  }

  @Post('events/:id/join')
  @UseGuards(JwtAuthGuard)
  async joinEvent(
    @Param('id') eventId: string,
    @Body('userId') userId: string,
    @Body('notes') notes?: string
  ) {
    return this.socialService.joinEvent(eventId, userId, notes)
  }

  @Post('events/:id/leave')
  @UseGuards(JwtAuthGuard)
  async leaveEvent(
    @Param('id') eventId: string,
    @Body('userId') userId: string
  ) {
    return this.socialService.leaveEvent(eventId, userId)
  }

  // ========== Room Shares ==========
  
  @Get('room-shares')
  async findRoomShares(
    @Query('city') city?: string,
    @Query('checkIn') checkIn?: string
  ) {
    return this.socialService.findRoomShares({ city, checkIn })
  }

  @Get('room-shares/:id')
  async findRoomShareById(@Param('id') id: string) {
    return this.socialService.findRoomShareById(id)
  }

  @Post('room-shares')
  @UseGuards(JwtAuthGuard)
  async createRoomShare(@Body() createRoomShareDto: CreateRoomShareDto) {
    return this.socialService.createRoomShare(createRoomShareDto)
  }

  @Post('room-shares/:id/respond')
  @UseGuards(JwtAuthGuard)
  async respondToRoomShare(
    @Param('id') roomShareId: string,
    @Body('userId') userId: string,
    @Body('message') message?: string
  ) {
    return this.socialService.respondToRoomShare(roomShareId, userId, message)
  }
}
