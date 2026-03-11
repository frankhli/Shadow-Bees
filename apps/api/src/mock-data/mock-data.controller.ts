import { Controller, Get, Param, Query, Post, Body } from '@nestjs/common'
import { MockDataService } from './mock-data.service'

@Controller('mock')
export class MockDataController {
  constructor(private readonly mockDataService: MockDataService) {}

  // ========== Hostels (v2.0 - 增强搜索) ==========
  @Get('hostels')
  async getHostels(
    @Query('city') city?: string,
    @Query('q') query?: string,
    @Query('experienceType') experienceType?: string,
    @Query('facility') facility?: string,  // comma-separated: western_toilet,elevator,english_staff
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    // 解析设施筛选参数
    const facilities = facility ? facility.split(',').filter(Boolean) : undefined
    
    return this.mockDataService.getHostels({
      city,
      query,
      experienceType,
      facilities,
      minPrice: minPrice ? parseInt(minPrice) : undefined,
      maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 20,
    })
  }

  @Get('hostels/featured')
  async getFeaturedHostels(@Query('limit') limit?: string) {
    return this.mockDataService.getFeaturedHostels(limit ? parseInt(limit) : 8)
  }

  @Get('hostels/:id')
  async getHostelById(@Param('id') id: string) {
    return this.mockDataService.getHostelById(id)
  }
  
  // 获取筛选选项（体验类型、设施、城市等）
  @Get('hostels/filters')
  async getFilterOptions() {
    return this.mockDataService.getFilterOptions()
  }

  // ========== Orders ==========
  @Get('orders')
  async getOrders(
    @Query('userId') userId?: string,
    @Query('status') status?: string,
  ) {
    return this.mockDataService.getOrders({ userId, status })
  }

  @Get('orders/:id')
  async getOrderById(@Param('id') id: string) {
    return this.mockDataService.getOrderById(id)
  }

  // ========== Guides ==========
  @Get('guides')
  async getGuides(
    @Query('city') city?: string,
    @Query('language') language?: string,
  ) {
    return this.mockDataService.getGuides({ city, language })
  }

  @Get('guides/:id')
  async getGuideById(@Param('id') id: string) {
    return this.mockDataService.getGuideById(id)
  }

  // ========== Experiences ==========
  @Get('experiences')
  async getExperiences(
    @Query('city') city?: string,
    @Query('type') type?: string,
  ) {
    return this.mockDataService.getExperiences({ city, type })
  }

  @Get('experiences/:id')
  async getExperienceById(@Param('id') id: string) {
    return this.mockDataService.getExperienceById(id)
  }

  // ========== Social Events ==========
  @Get('events')
  async getEvents(@Query('city') city?: string) {
    return this.mockDataService.getEvents({ city })
  }

  @Get('events/:id')
  async getEventById(@Param('id') id: string) {
    return this.mockDataService.getEventById(id)
  }

  @Post('events/:id/join')
  async joinEvent(@Param('id') id: string, @Body() body: { userId: string }) {
    // Mock join - in real implementation would update the database
    return { success: true, eventId: id, userId: body.userId }
  }

  // ========== Room Shares ==========
  @Get('room-shares')
  async getRoomShares(@Query('city') city?: string) {
    return this.mockDataService.getRoomShares({ city })
  }

  @Get('room-shares/:id')
  async getRoomShareById(@Param('id') id: string) {
    return this.mockDataService.getRoomShareById(id)
  }

  @Post('room-shares/:id/respond')
  async respondToRoomShare(@Param('id') id: string, @Body() body: { userId: string; message?: string }) {
    // Mock response
    return { success: true, roomShareId: id, userId: body.userId }
  }

  // ========== Chat ==========
  @Get('chat/conversations')
  async getConversations(@Query('userId') userId: string) {
    return this.mockDataService.getConversations(userId || 'user-001')
  }

  @Get('chat/conversations/:id')
  async getConversationById(@Param('id') id: string) {
    return this.mockDataService.getConversationById(id)
  }

  @Get('chat/conversations/:id/messages')
  async getMessages(@Param('id') conversationId: string) {
    return this.mockDataService.getMessages(conversationId)
  }

  @Post('chat/conversations/:id/read')
  async markAsRead(@Param('id') id: string, @Body() body: { userId: string }) {
    return { success: true }
  }

  @Post('chat/messages')
  async sendMessage(@Body() body: { conversationId: string; senderId: string; content: string; contentType?: string }) {
    return {
      id: `msg-${Date.now()}`,
      conversationId: body.conversationId,
      senderId: body.senderId,
      content: body.content,
      contentType: body.contentType || 'text',
      createdAt: new Date().toISOString(),
      isDeleted: false,
    }
  }

  // ========== Current User ==========
  @Get('me')
  async getCurrentUser() {
    return this.mockDataService.getCurrentUser()
  }
}
