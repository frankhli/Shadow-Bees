import { Injectable } from '@nestjs/common'
import { PrismaClient, GuideStatus } from '@tiaohai/database'
import { CreateGuideDto } from './dto/create-guide.dto'
import { UpdateAvailabilityDto } from './dto/update-availability.dto'

@Injectable()
export class GuidesService {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async findAll(filters: { city?: string; language?: string; date?: string }) {
    const where: any = {
      status: GuideStatus.ACTIVE,
      licenseVerified: true,
    }

    if (filters.city) {
      where.city = filters.city
    }

    if (filters.language) {
      where.languages = { has: filters.language }
    }

    const guides = await this.prisma.guide.findMany({
      where,
      include: {
        user: {
          select: { email: true },
        },
      },
      orderBy: { rating: 'desc' },
    })

    // Filter by availability if date provided
    if (filters.date) {
      return guides.filter((guide) => this.isAvailable(guide, filters.date!))
    }

    return guides
  }

  async findOne(id: string) {
    return this.prisma.guide.findUnique({
      where: { id },
      include: {
        user: {
          select: { email: true },
        },
      },
    })
  }

  async create(data: CreateGuideDto) {
    // Create user first
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: data.password, // Should be hashed
        role: 'GUIDE',
      },
    })

    // Create guide profile
    return this.prisma.guide.create({
      data: {
        userId: user.id,
        name: data.name,
        nameEn: data.nameEn,
        languages: data.languages,
        specialties: data.specialties,
        licenseNo: data.licenseNo,
        city: data.city,
        bio: data.bio,
        bioEn: data.bioEn,
        hourlyRate: data.hourlyRate,
        availability: {},
        status: GuideStatus.ACTIVE,
      },
    })
  }

  async getAvailability(guideId: string, month: string) {
    const guide = await this.prisma.guide.findUnique({
      where: { id: guideId },
      select: { availability: true },
    })

    if (!guide) {
      throw new Error('Guide not found')
    }

    // Return availability for the specified month
    const availability = guide.availability as Record<string, any>
    const monthPrefix = month.substring(0, 7) // YYYY-MM

    return Object.entries(availability || {})
      .filter(([date]) => date.startsWith(monthPrefix))
      .map(([date, slots]) => ({ date, slots }))
  }

  async updateAvailability(guideId: string, data: UpdateAvailabilityDto) {
    const guide = await this.prisma.guide.findUnique({
      where: { id: guideId },
      select: { availability: true },
    })

    if (!guide) {
      throw new Error('Guide not found')
    }

    const currentAvailability = (guide.availability as Record<string, any>) || {}

    // Update specific dates
    const newAvailability = { ...currentAvailability }
    for (const [date, slots] of Object.entries(data.availability)) {
      newAvailability[date] = slots
    }

    return this.prisma.guide.update({
      where: { id: guideId },
      data: {
        availability: newAvailability,
      },
    })
  }

  private isAvailable(guide: any, date: string): boolean {
    const availability = guide.availability as Record<string, any>
    if (!availability || !availability[date]) {
      return false
    }
    return availability[date].available === true
  }
}
