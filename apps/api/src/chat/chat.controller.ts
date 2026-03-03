import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common'
import { ChatService } from './chat.service'
import { SendMessageDto } from './dto/send-message.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // Get all conversations for a user
  @Get('conversations')
  @UseGuards(JwtAuthGuard)
  async getConversations(@Query('userId') userId: string) {
    return this.chatService.getConversations(userId)
  }

  // Get messages in a conversation
  @Get('conversations/:id/messages')
  @UseGuards(JwtAuthGuard)
  async getMessages(
    @Param('id') conversationId: string,
    @Query('limit') limit?: string,
    @Query('before') before?: string
  ) {
    return this.chatService.getMessages(conversationId, {
      limit: limit ? parseInt(limit) : 50,
      before
    })
  }

  // Send a message
  @Post('messages')
  @UseGuards(JwtAuthGuard)
  async sendMessage(@Body() sendMessageDto: SendMessageDto) {
    return this.chatService.sendMessage(sendMessageDto)
  }

  // Create a new conversation
  @Post('conversations')
  @UseGuards(JwtAuthGuard)
  async createConversation(
    @Body('participants') participants: string[],
    @Body('type') type: 'direct' | 'group',
    @Body('title') title?: string
  ) {
    return this.chatService.createConversation(participants, type, title)
  }

  // Mark messages as read
  @Post('conversations/:id/read')
  @UseGuards(JwtAuthGuard)
  async markAsRead(
    @Param('id') conversationId: string,
    @Body('userId') userId: string
  ) {
    return this.chatService.markAsRead(conversationId, userId)
  }
}
