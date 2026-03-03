import { Injectable } from '@nestjs/common'
import { PrismaClient, OrderStatus, OrderType, PaymentStatus } from '@tiaohai/database'
import { CreateOrderDto } from './dto/create-order.dto'

@Injectable()
export class OrdersService {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async findAll(filters: { hotelId?: string; guestId?: string; guideId?: string; status?: string }) {
    const where: any = {}
    
    if (filters.hotelId) where.hotelId = filters.hotelId
    if (filters.guestId) where.guestId = filters.guestId
    if (filters.guideId) where.guideId = filters.guideId
    if (filters.status) where.status = filters.status

    return this.prisma.order.findMany({
      where,
      include: {
        hotel: {
          select: { name: true, city: true },
        },
        roomType: {
          select: { name: true, nameEn: true },
        },
        guide: {
          select: { name: true, nameEn: true },
        },
        guest: {
          select: { name: true, nationality: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
  }

  async findOne(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        hotel: true,
        roomType: true,
        guide: true,
        experience: true,
        guest: {
          select: { name: true, nationality: true },
        },
      },
    })
  }

  async create(data: CreateOrderDto) {
    const orderNo = this.generateOrderNo()
    
    // Calculate totals
    let totalAmount = 0
    let platformFee = 0

    if (data.roomPriceTotal) {
      totalAmount += data.roomPriceTotal
      platformFee += data.roomPriceTotal * 0.15 // 15% platform fee
    }
    if (data.guideFee) {
      totalAmount += data.guideFee
      platformFee += data.guideFee * 0.25 // 25% guide commission
    }
    if (data.experienceFee) {
      totalAmount += data.experienceFee
      platformFee += data.experienceFee * 0.20 // 20% experience commission
    }

    return this.prisma.order.create({
      data: {
        orderNo,
        guestId: data.guestId,
        guestNationality: data.guestNationality,
        orderType: data.orderType || OrderType.ACCOMMODATION_ONLY,
        
        // Accommodation
        hotelId: data.hotelId,
        roomTypeId: data.roomTypeId,
        checkIn: data.checkIn ? new Date(data.checkIn) : null,
        checkOut: data.checkOut ? new Date(data.checkOut) : null,
        nights: data.nights,
        roomPriceTotal: data.roomPriceTotal,
        
        // Guide
        guideId: data.guideId,
        serviceDate: data.serviceDate ? new Date(data.serviceDate) : null,
        serviceHours: data.serviceHours,
        guideFee: data.guideFee,
        
        // Experience
        experienceId: data.experienceId,
        experienceFee: data.experienceFee,
        
        // Financials
        totalAmount,
        currency: data.currency || 'USD',
        exchangeRate: data.exchangeRate,
        platformFee,
        paymentStatus: PaymentStatus.PENDING,
        status: OrderStatus.CONFIRMED,
      },
    })
  }

  async cancel(id: string, reason?: string) {
    return this.prisma.order.update({
      where: { id },
      data: {
        status: OrderStatus.CANCELLED,
        cancelledAt: new Date(),
        cancelledReason: reason,
      },
    })
  }

  async confirm(id: string) {
    return this.prisma.order.update({
      where: { id },
      data: {
        status: OrderStatus.CONFIRMED,
      },
    })
  }

  async complete(id: string) {
    return this.prisma.order.update({
      where: { id },
      data: {
        status: OrderStatus.COMPLETED,
        completedAt: new Date(),
      },
    })
  }

  private generateOrderNo(): string {
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const random = Math.floor(1000 + Math.random() * 9000)
    return `TH${year}${month}${day}${random}`
  }
}
