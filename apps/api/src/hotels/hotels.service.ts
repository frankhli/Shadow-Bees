import { Injectable } from '@nestjs/common'
// import { PrismaClient, HotelStatus } from '@tiaohai/database'
import { mockPrisma } from '../mock-prisma'
import { CreateHotelDto } from './dto/create-hotel.dto'

const HotelStatus = { ACTIVE: 'ACTIVE', PENDING: 'PENDING', INACTIVE: 'INACTIVE' }

@Injectable()
export class HotelsService {
  private prisma: any

  constructor() {
    this.prisma = mockPrisma
  }

  async findAll(filters: { city?: string; page: number }) {
    const { city, page } = filters
    const perPage = 20
    
    const hotels = await this.prisma.hotel.findMany()
    const total = await this.prisma.hotel.count()

    return {
      data: hotels,
      meta: {
        total,
        page,
        perPage,
        totalPages: Math.ceil(total / perPage),
      },
    }
  }

  async findOne(id: string) {
    return this.prisma.hotel.findUnique({ where: { id } })
  }

  async create(data: CreateHotelDto & { userId: string }) {
    return this.prisma.hotel.create({
      data: {
        ...data,
        status: 'PENDING',
      },
    })
  }
}
