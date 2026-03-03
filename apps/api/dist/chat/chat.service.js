"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const database_1 = require("@tiaohai/database");
let ChatService = class ChatService {
    constructor() {
        this.prisma = new database_1.PrismaClient();
    }
    async getConversations(userId) {
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
        });
        return participants.map(p => {
            const conv = p.conversation;
            const lastMessage = conv.messages[0];
            const unreadCount = 0;
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
            };
        });
    }
    async getMessages(conversationId, options) {
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
        });
        return messages.reverse();
    }
    async sendMessage(data) {
        const message = await this.prisma.chatMessage.create({
            data: {
                conversationId: data.conversationId,
                senderId: data.senderId,
                content: data.content,
                contentType: data.contentType || 'text'
            }
        });
        await this.prisma.conversation.update({
            where: { id: data.conversationId },
            data: { updatedAt: new Date() }
        });
        return message;
    }
    async createConversation(participants, type, title) {
        if (type === 'direct' && participants.length === 2) {
            const existing = await this.findDirectConversation(participants[0], participants[1]);
            if (existing)
                return existing;
        }
        const conversation = await this.prisma.conversation.create({
            data: {
                type: type === 'direct' ? database_1.ConversationType.DIRECT : database_1.ConversationType.GROUP,
                title,
                participants: {
                    create: participants.map((userId, index) => ({
                        userId,
                        role: index === 0 ? database_1.ParticipantRole.OWNER : database_1.ParticipantRole.MEMBER
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
        });
        return conversation;
    }
    async markAsRead(conversationId, userId) {
        return this.prisma.conversationParticipant.update({
            where: {
                conversationId_userId: {
                    conversationId,
                    userId
                }
            },
            data: { lastReadAt: new Date() }
        });
    }
    async findDirectConversation(userId1, userId2) {
        const conversations = await this.prisma.conversation.findMany({
            where: {
                type: database_1.ConversationType.DIRECT,
                participants: {
                    every: {
                        userId: { in: [userId1, userId2] }
                    }
                }
            },
            include: {
                participants: true
            }
        });
        return conversations.find(c => c.participants.length === 2);
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ChatService);
//# sourceMappingURL=chat.service.js.map