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
exports.SocialService = void 0;
const common_1 = require("@nestjs/common");
const database_1 = require("@tiaohai/database");
let SocialService = class SocialService {
    constructor() {
        this.prisma = new database_1.PrismaClient();
    }
    async findEvents(filters) {
        const where = {
            status: { in: [database_1.EventStatus.OPEN, database_1.EventStatus.FULL] }
        };
        if (filters.city) {
            where.city = filters.city;
        }
        if (filters.type) {
            where.type = filters.type;
        }
        if (filters.date) {
            const startOfDay = new Date(filters.date);
            const endOfDay = new Date(filters.date);
            endOfDay.setDate(endOfDay.getDate() + 1);
            where.eventDate = {
                gte: startOfDay,
                lt: endOfDay
            };
        }
        const events = await this.prisma.socialEvent.findMany({
            where,
            include: {
                participants: {
                    where: { status: database_1.ParticipantStatus.CONFIRMED },
                    select: { id: true }
                }
            },
            orderBy: { eventDate: 'asc' }
        });
        return events.map(event => ({
            ...event,
            currentPeople: event.participants.length
        }));
    }
    async findEventById(id) {
        const event = await this.prisma.socialEvent.findUnique({
            where: { id },
            include: {
                participants: {
                    where: { status: database_1.ParticipantStatus.CONFIRMED },
                    include: {
                        user: {
                            select: { id: true, name: true, nationality: true }
                        }
                    }
                }
            }
        });
        if (!event)
            return null;
        return {
            ...event,
            currentPeople: event.participants.length
        };
    }
    async createEvent(data) {
        return this.prisma.socialEvent.create({
            data: {
                organizerId: data.organizerId,
                organizerType: data.organizerType,
                title: data.title,
                titleEn: data.titleEn,
                description: data.description,
                descriptionEn: data.descriptionEn,
                type: data.type,
                city: data.city,
                meetingPoint: data.meetingPoint,
                meetingPointEn: data.meetingPointEn,
                eventDate: new Date(data.eventDate),
                duration: data.duration,
                maxPeople: data.maxPeople,
                price: data.price || 0,
                currency: data.currency || 'USD',
                status: database_1.EventStatus.OPEN
            }
        });
    }
    async joinEvent(eventId, userId, notes) {
        const event = await this.prisma.socialEvent.findUnique({
            where: { id: eventId },
            include: {
                participants: {
                    where: { status: database_1.ParticipantStatus.CONFIRMED }
                }
            }
        });
        if (!event || event.status !== database_1.EventStatus.OPEN) {
            throw new Error('Event not available');
        }
        if (event.participants.length >= event.maxPeople) {
            throw new Error('Event is full');
        }
        const participant = await this.prisma.eventParticipant.create({
            data: {
                eventId,
                userId,
                status: database_1.ParticipantStatus.CONFIRMED,
                notes
            }
        });
        if (event.participants.length + 1 >= event.maxPeople) {
            await this.prisma.socialEvent.update({
                where: { id: eventId },
                data: { status: database_1.EventStatus.FULL }
            });
        }
        return participant;
    }
    async leaveEvent(eventId, userId) {
        const participant = await this.prisma.eventParticipant.updateMany({
            where: {
                eventId,
                userId,
                status: database_1.ParticipantStatus.CONFIRMED
            },
            data: { status: database_1.ParticipantStatus.CANCELLED }
        });
        const event = await this.prisma.socialEvent.findUnique({
            where: { id: eventId },
            include: {
                participants: {
                    where: { status: database_1.ParticipantStatus.CONFIRMED }
                }
            }
        });
        if (event && event.status === database_1.EventStatus.FULL && event.participants.length < event.maxPeople) {
            await this.prisma.socialEvent.update({
                where: { id: eventId },
                data: { status: database_1.EventStatus.OPEN }
            });
        }
        return participant;
    }
    async findRoomShares(filters) {
        const where = {
            status: database_1.RoomShareStatus.OPEN
        };
        if (filters.city) {
            where.city = filters.city;
        }
        if (filters.checkIn) {
            where.checkIn = {
                gte: new Date(filters.checkIn)
            };
        }
        const roomShares = await this.prisma.roomShare.findMany({
            where,
            include: {
                responses: {
                    where: { status: { in: [database_1.ResponseStatus.INTERESTED, database_1.ResponseStatus.CONFIRMED] } },
                    select: { id: true, status: true }
                }
            },
            orderBy: { checkIn: 'asc' }
        });
        return roomShares.map(share => ({
            ...share,
            currentPeople: share.responses.filter(r => r.status === database_1.ResponseStatus.CONFIRMED).length,
            interestedPeople: share.responses.filter(r => r.status === database_1.ResponseStatus.INTERESTED).length
        }));
    }
    async findRoomShareById(id) {
        const roomShare = await this.prisma.roomShare.findUnique({
            where: { id },
            include: {
                responses: {
                    include: {
                        user: {
                            select: { id: true, name: true, nationality: true, languages: true }
                        }
                    }
                }
            }
        });
        if (!roomShare)
            return null;
        return {
            ...roomShare,
            currentPeople: roomShare.responses.filter(r => r.status === database_1.ResponseStatus.CONFIRMED).length,
            interestedPeople: roomShare.responses.filter(r => r.status === database_1.ResponseStatus.INTERESTED).length
        };
    }
    async createRoomShare(data) {
        return this.prisma.roomShare.create({
            data: {
                organizerId: data.organizerId,
                hotelId: data.hotelId,
                hotelName: data.hotelName,
                city: data.city,
                roomType: data.roomType,
                checkIn: new Date(data.checkIn),
                checkOut: new Date(data.checkOut),
                pricePerPerson: data.pricePerPerson,
                currency: data.currency || 'USD',
                maxPeople: data.maxPeople,
                description: data.description,
                descriptionEn: data.descriptionEn,
                tags: data.tags || [],
                status: database_1.RoomShareStatus.OPEN
            }
        });
    }
    async respondToRoomShare(roomShareId, userId, message) {
        const roomShare = await this.prisma.roomShare.findUnique({
            where: { id: roomShareId },
            include: {
                responses: {
                    where: { status: database_1.ResponseStatus.CONFIRMED }
                }
            }
        });
        if (!roomShare || roomShare.status !== database_1.RoomShareStatus.OPEN) {
            throw new Error('Room share not available');
        }
        const existingResponse = await this.prisma.roomShareResponse.findUnique({
            where: {
                roomShareId_userId: {
                    roomShareId,
                    userId
                }
            }
        });
        if (existingResponse) {
            throw new Error('Already responded to this room share');
        }
        return this.prisma.roomShareResponse.create({
            data: {
                roomShareId,
                userId,
                status: database_1.ResponseStatus.INTERESTED,
                message
            }
        });
    }
};
exports.SocialService = SocialService;
exports.SocialService = SocialService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SocialService);
//# sourceMappingURL=social.service.js.map