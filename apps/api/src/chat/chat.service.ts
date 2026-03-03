import { Injectable } from '@nestjs/common'
import { PrismaClient, ConversationType, ParticipantRole } from '@tiaohai/database'
import { SendMessageDto } from './dto/send-message.dto'

@Injectable()
export class ChatService {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async getConversations(userId: string) {
    const participants = await this.prisma.conversationParticipant.findMany({
      where: { userId },
      include: {
        conversation: {
          include: {
            participants: {
              include: {
                user: {
                  select: { id: true, name: true }
                }
              }
            },
            messages: {
              orderBy: { createdAt: 'desc' },
              take: 1,
              select: {
                content: true,
                createdAt: true,
                senderId: true
              }
            }
          }
        }
      },
      orderBy: {
        conversation: { updatedAt: 'desc' }
      }
    })

    return participants.map(p => {
      const conv = p.conversation
      const lastMessage = conv.messages[0]
      const unreadCount = 0 // TODO: Calculate unread
      
      return {
        id: conv.id,
        type: conv.type,
        title: conv.title,
        lastMessage: lastMessage ? {
          content: lastMessage.content,
          createdAt: lastMessage.createdAt,
          senderId: lastMessage.senderId
        } : null,
        unreadCount,
        participants: conv.participants.map(cp => ({
          id: cp.user.id,
          name: cp.user.name,
          role: cp.role
        }))
      }
    })
  }

  async getMessages(
    conversationId: string,
    options: { limit: number; before?: string }
  ) {
    const messages = await this.prisma.chatMessage.findMany({
      where: {
        conversationId,
        isDeleted: false,
        ...(options.before && {
          createdAt: { lt: new Date(options.before) }
        })
      },
      orderBy: { createdAt: 'desc' },
      take: options.limit
    })

    return messages.reverse()
  }

  async sendMessage(data: SendMessageDto) {
    const message = await this.prisma.chatMessage.create({
      data: {
        conversationId: data.conversationId,
        senderId: data.senderId,
        content: data.content,
        contentType: data.contentType || 'text'
      }
    })

    // Update conversation updatedAt
    await this.prisma.conversation.update({
      where: { id: data.conversationId },
      data: { updatedAt: new Date() }
    })

    return message
  }

  async createConversation(
    participants: string[],
    type: 'direct' | 'group',
    title?: string
  ) {
    // For direct conversations, check if one already exists
    if (type === 'direct' && participants.length === 2) {
      const existing = await this.findDirectConversation(participants[0], participants[1])
      if (existing) return existing
    }

    const conversation = await this.prisma.conversation.create({
      data: {
        type: type === 'direct' ? ConversationType.DIRECT : ConversationType.GROUP,
        title,
        participants: {
          create: participants.map((userId, index) => ({
            userId,
            role: index === 0 ? ParticipantRole.OWNER : ParticipantRole.MEMBER
          }))
        }
      },
      include: {
        participants: {
          include: {
            user: {
              select: { id: true, name: true }
            }
          }
        }
      }
    })

    return conversation
  }

  async markAsRead(conversationId: string, userId: string) {
    return this.prisma.conversationParticipant.update({
      where: {
        conversationId_userId: {
          conversationId,
          userId
        }
      },
      data: { lastReadAt: new Date() }
    })
  }

  private async findDirectConversation(userId1: string, userId2: string) {
    // Find conversations where both users are participants and type is DIRECT
    const conversations = await this.prisma.conversation.findMany({
      where: {
        type: ConversationType.DIRECT,
        participants: {
          every: {
            userId: { in: [userId1, userId2] }
          }
        }
      },
      include: {
        participants: true
      }
    })

    // Filter to only get conversations with exactly 2 participants
    return conversations.find(c => c.participants.length === 2)
  }
}
