import { Injectable } from '@nestjs/common'
import { PrismaClient, ExperienceType } from '@tiaohai/database'
import { CreateExperienceDto } from './dto/create-experience.dto'

@Injectable()
export class ExperiencesService {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async findAll(filters: { city?: string; type?: string }) {
    const where: any = {
      isActive: true,
    }

    if (filters.city) {
      where.city = filters.city
    }

    if (filters.type) {
      where.type = filters.type
    }

    return this.prisma.experience.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })
  }

  async findOne(id: string) {
    return this.prisma.experience.findUnique({
      where: { id },
    })
  }

  async create(data: CreateExperienceDto) {
    return this.prisma.experience.create({
      data: {
        name: data.name,
        nameEn: data.nameEn,
        type: data.type as ExperienceType,
        city: data.city,
        address: data.address,
        lat: data.lat,
        lng: data.lng,
        description: data.description,
        descriptionEn: data.descriptionEn,
        pricePerPerson: data.pricePerPerson,
        durationMinutes: data.durationMinutes,
        maxCapacity: data.maxCapacity,
        photos: data.photos || [],
        partnerContract: data.partnerContract,
        isActive: true,
      },
    })
  }
}
