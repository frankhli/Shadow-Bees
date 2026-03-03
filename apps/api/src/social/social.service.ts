import { Injectable } from '@nestjs/common'
import { PrismaClient, EventStatus, RoomShareStatus, ParticipantStatus, ResponseStatus } from '@tiaohai/database'
import { CreateEventDto } from './dto/create-event.dto'
import { CreateRoomShareDto } from './dto/create-room-share.dto'

@Injectable()
export class SocialService {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  // ========== Events ==========

  async findEvents(filters: { city?: string; type?: string; date?: string }) {
    const where: any = {
      status: { in: [EventStatus.OPEN, EventStatus.FULL] }
    }

    if (filters.city) {
      where.city = filters.city
    }

    if (filters.type) {
      where.type = filters.type
    }

    if (filters.date) {
      const startOfDay = new Date(filters.date)
      const endOfDay = new Date(filters.date)
      endOfDay.setDate(endOfDay.getDate() + 1)
      where.eventDate = {
        gte: startOfDay,
        lt: endOfDay
      }
    }

    const events = await this.prisma.socialEvent.findMany({
      where,
      include: {
        participants: {
          where: { status: ParticipantStatus.CONFIRMED },
          select: { id: true }
        }
      },
      orderBy: { eventDate: 'asc' }
    })

    return events.map(event => ({
      ...event,
      currentPeople: event.participants.length
    }))
  }

  async findEventById(id: string) {
    const event = await this.prisma.socialEvent.findUnique({
      where: { id },
      include: {
        participants: {
          where: { status: ParticipantStatus.CONFIRMED },
          include: {
            user: {
              select: { id: true, name: true, nationality: true }
            }
          }
        }
      }
    })

    if (!event) return null

    return {
      ...event,
      currentPeople: event.participants.length
    }
  }

  async createEvent(data: CreateEventDto) {
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
        status: EventStatus.OPEN
      }
    })
  }

  async joinEvent(eventId: string, userId: string, notes?: string) {
    const event = await this.prisma.socialEvent.findUnique({
      where: { id: eventId },
      include: {
        participants: {
          where: { status: ParticipantStatus.CONFIRMED }
        }
      }
    })

    if (!event || event.status !== EventStatus.OPEN) {
      throw new Error('Event not available')
    }

    if (event.participants.length >= event.maxPeople) {
      throw new Error('Event is full')
    }

    const participant = await this.prisma.eventParticipant.create({
      data: {
        eventId,
        userId,
        status: ParticipantStatus.CONFIRMED,
        notes
      }
    })

    // Update event status if full
    if (event.participants.length + 1 >= event.maxPeople) {
      await this.prisma.socialEvent.update({
        where: { id: eventId },
        data: { status: EventStatus.FULL }
      })
    }

    return participant
  }

  async leaveEvent(eventId: string, userId: string) {
    const participant = await this.prisma.eventParticipant.updateMany({
      where: {
        eventId,
        userId,
        status: ParticipantStatus.CONFIRMED
      },
      data: { status: ParticipantStatus.CANCELLED }
    })

    // Update event status back to open if it was full
    const event = await this.prisma.socialEvent.findUnique({
      where: { id: eventId },
      include: {
        participants: {
          where: { status: ParticipantStatus.CONFIRMED }
        }
      }
    })

    if (event && event.status === EventStatus.FULL && event.participants.length < event.maxPeople) {
      await this.prisma.socialEvent.update({
        where: { id: eventId },
        data: { status: EventStatus.OPEN }
      })
    }

    return participant
  }

  // ========== Room Shares ==========

  async findRoomShares(filters: { city?: string; checkIn?: string }) {
    const where: any = {
      status: RoomShareStatus.OPEN
    }

    if (filters.city) {
      where.city = filters.city
    }

    if (filters.checkIn) {
      where.checkIn = {
        gte: new Date(filters.checkIn)
      }
    }

    const roomShares = await this.prisma.roomShare.findMany({
      where,
      include: {
        responses: {
          where: { status: { in: [ResponseStatus.INTERESTED, ResponseStatus.CONFIRMED] } },
          select: { id: true, status: true }
        }
      },
      orderBy: { checkIn: 'asc' }
    })

    return roomShares.map(share => ({
      ...share,
      currentPeople: share.responses.filter(r => r.status === ResponseStatus.CONFIRMED).length,
      interestedPeople: share.responses.filter(r => r.status === ResponseStatus.INTERESTED).length
    }))
  }

  async findRoomShareById(id: string) {
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
    })

    if (!roomShare) return null

    return {
      ...roomShare,
      currentPeople: roomShare.responses.filter(r => r.status === ResponseStatus.CONFIRMED).length,
      interestedPeople: roomShare.responses.filter(r => r.status === ResponseStatus.INTERESTED).length
    }
  }

  async createRoomShare(data: CreateRoomShareDto) {
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
        status: RoomShareStatus.OPEN
      }
    })
  }

  async respondToRoomShare(roomShareId: string, userId: string, message?: string) {
    const roomShare = await this.prisma.roomShare.findUnique({
      where: { id: roomShareId },
      include: {
        responses: {
          where: { status: ResponseStatus.CONFIRMED }
        }
      }
    })

    if (!roomShare || roomShare.status !== RoomShareStatus.OPEN) {
      throw new Error('Room share not available')
    }

    const existingResponse = await this.prisma.roomShareResponse.findUnique({
      where: {
        roomShareId_userId: {
          roomShareId,
          userId
        }
      }
    })

    if (existingResponse) {
      throw new Error('Already responded to this room share')
    }

    return this.prisma.roomShareResponse.create({
      data: {
        roomShareId,
        userId,
        status: ResponseStatus.INTERESTED,
        message
      }
    })
  }
}
