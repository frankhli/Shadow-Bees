import { Injectable, Logger } from '@nestjs/common'
import { PrismaClient, GuideStatus, OrderType } from '@tiaohai/database'

interface DispatchCriteria {
  city: string
  date: string
  languages: string[]
  serviceType?: string
}

interface GuideScore {
  guide: any
  score: number
  factors: {
    languageMatch: number
    ratingScore: number
    loadBalance: number
    availability: number
    specialtyMatch: number
  }
}

@Injectable()
export class DispatchService {
  private prisma: PrismaClient
  private readonly logger = new Logger(DispatchService.name)

  constructor() {
    this.prisma = new PrismaClient()
  }

  /**
   * Main dispatch algorithm - finds the best guide for a service
   * Algorithm: Weighted scoring based on multiple factors
   */
  async findBestGuide(criteria: DispatchCriteria): Promise<{
    success: boolean
    guide?: any
    alternatives?: any[]
    score?: number
    factors?: any
  }> {
    const { city, date, languages, serviceType } = criteria

    this.logger.log(`Finding guide for ${city} on ${date}, languages: ${languages.join(',')}`)

    // 1. Get all eligible guides
    const eligibleGuides = await this.getEligibleGuides(city, date, languages)

    if (eligibleGuides.length === 0) {
      return {
        success: false,
        alternatives: [],
      }
    }

    // 2. Score each guide
    const scoredGuides: GuideScore[] = eligibleGuides.map((guide) =>
      this.calculateGuideScore(guide, criteria)
    )

    // 3. Sort by score (descending)
    scoredGuides.sort((a, b) => b.score - a.score)

    // 4. Get top match and alternatives
    const bestMatch = scoredGuides[0]
    const alternatives = scoredGuides.slice(1, 4).map((sg) => ({
      ...sg.guide,
      score: sg.score,
      factors: sg.factors,
    }))

    this.logger.log(
      `Best match: ${bestMatch.guide.name} with score ${bestMatch.score.toFixed(2)}`
    )

    return {
      success: true,
      guide: bestMatch.guide,
      score: bestMatch.score,
      factors: bestMatch.factors,
      alternatives,
    }
  }

  /**
   * Assign a guide to an order
   */
  async assignGuide(orderId: string, guideId: string) {
    // Update order with guide
    const order = await this.prisma.order.update({
      where: { id: orderId },
      data: {
        guideId,
        orderType: OrderType.BUNDLE,
      },
      include: {
        guide: true,
        hotel: true,
      },
    })

    // Mark guide as busy for the service date
    if (order.serviceDate) {
      await this.markGuideBusy(guideId, order.serviceDate)
    }

    // Update guide stats
    await this.updateGuideStats(guideId)

    this.logger.log(`Guide ${guideId} assigned to order ${orderId}`)

    return order
  }

  /**
   * Auto-dispatch: automatically assign the best guide
   */
  async autoDispatch(orderId: string): Promise<{
    success: boolean
    guide?: any
    message?: string
  }> {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { hotel: true },
    })

    if (!order || !order.hotel) {
      return { success: false, message: 'Order not found' }
    }

    if (!order.serviceDate) {
      return { success: false, message: 'No service date specified' }
    }

    // Find best guide
    const result = await this.findBestGuide({
      city: order.hotel.city,
      date: order.serviceDate.toISOString().split('T')[0],
      languages: ['en'], // Default to English, could be from guest preference
      serviceType: 'tour',
    })

    if (!result.success || !result.guide) {
      return { success: false, message: 'No available guides found' }
    }

    // Auto-assign
    await this.assignGuide(orderId, result.guide.id)

    return {
      success: true,
      guide: result.guide,
    }
  }

  /**
   * Get eligible guides based on basic criteria
   */
  private async getEligibleGuides(
    city: string,
    date: string,
    languages: string[]
  ) {
    const guides = await this.prisma.guide.findMany({
      where: {
        city,
        status: GuideStatus.ACTIVE,
        licenseVerified: true,
        languages: { hasSome: languages },
      },
      include: {
        user: {
          select: { email: true },
        },
      },
    })

    // Filter by availability
    return guides.filter((guide) => this.isGuideAvailable(guide, date))
  }

  /**
   * Calculate comprehensive score for a guide
   * Weights:
   * - Language match: 30%
   * - Rating: 25%
   * - Load balance: 25%
   * - Availability: 10%
   * - Specialty match: 10%
   */
  private calculateGuideScore(
    guide: any,
    criteria: DispatchCriteria
  ): GuideScore {
    const factors = {
      languageMatch: this.calculateLanguageScore(guide, criteria.languages),
      ratingScore: this.calculateRatingScore(guide),
      loadBalance: this.calculateLoadBalanceScore(guide),
      availability: this.calculateAvailabilityScore(guide, criteria.date),
      specialtyMatch: this.calculateSpecialtyScore(guide, criteria.serviceType),
    }

    // Weighted sum
    const score =
      factors.languageMatch * 0.3 +
      factors.ratingScore * 0.25 +
      factors.loadBalance * 0.25 +
      factors.availability * 0.1 +
      factors.specialtyMatch * 0.1

    return {
      guide,
      score,
      factors,
    }
  }

  private calculateLanguageScore(guide: any, requiredLanguages: string[]): number {
    const guideLanguages = guide.languages as string[]
    const matches = requiredLanguages.filter((lang) =>
      guideLanguages.includes(lang)
    ).length
    return matches / requiredLanguages.length
  }

  private calculateRatingScore(guide: any): number {
    // Normalize rating (0-5) to score (0-1)
    return guide.rating ? guide.rating.toNumber() / 5 : 0.8
  }

  private calculateLoadBalanceScore(guide: any): number {
    // Lower recent bookings = higher score
    // This would query recent orders in production
    const recentBookings = guide._count?.orders || 0
    return Math.max(0, 1 - recentBookings * 0.1)
  }

  private calculateAvailabilityScore(guide: any, date: string): number {
    const availability = guide.availability as Record<string, any>
    if (!availability || !availability[date]) {
      return 0
    }
    return availability[date].available ? 1 : 0
  }

  private calculateSpecialtyScore(guide: any, serviceType?: string): number {
    if (!serviceType) return 0.5
    const specialties = guide.specialties as string[]
    if (!specialties) return 0.5
    return specialties.includes(serviceType) ? 1 : 0.3
  }

  private isGuideAvailable(guide: any, date: string): boolean {
    const availability = guide.availability as Record<string, any>
    if (!availability || !availability[date]) {
      return true // Default to available if no data
    }
    return availability[date].available !== false
  }

  private async markGuideBusy(guideId: string, date: Date) {
    const dateStr = date.toISOString().split('T')[0]
    const guide = await this.prisma.guide.findUnique({
      where: { id: guideId },
      select: { availability: true },
    })

    if (!guide) return

    const availability = (guide.availability as Record<string, any>) || {}
    availability[dateStr] = { available: false, booked: true }

    await this.prisma.guide.update({
      where: { id: guideId },
      data: { availability },
    })
  }

  private async updateGuideStats(guideId: string) {
    // Update guide's recent order count and other stats
    const orderCount = await this.prisma.order.count({
      where: { guideId },
    })

    this.logger.log(`Guide ${guideId} has ${orderCount} total bookings`)
  }
}
