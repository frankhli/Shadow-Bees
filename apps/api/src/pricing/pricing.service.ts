import { Injectable, Logger } from '@nestjs/common'
import { PrismaClient } from '@tiaohai/database'
import { InventoryService } from '../inventory/inventory.service'

interface PricingCriteria {
  hotelId: string
  roomTypeId: string
  date: string
  guestNationality?: string
}

interface PricingResult {
  basePrice: number
  adjustedPrice: number
  currency: string
  factors: {
    exchangeRate: number
    demandMultiplier: number
    scarcityMultiplier: number
    visaPolicyMultiplier: number
  }
  breakdown: {
    baseCny: number
    baseUsd: number
    demandPremium: number
    scarcityPremium: number
    visaPremium: number
  }
  validUntil: string
}

@Injectable()
export class PricingService {
  private prisma: PrismaClient
  private readonly logger = new Logger(PricingService.name)

  // Visa-free countries that get demand premium
  private visaFreeCountries = [
    'US', 'CA', 'UK', 'AU', 'NZ', // Anglo
    'DE', 'FR', 'IT', 'ES', 'NL', // EU
    'JP', 'KR', 'SG', 'MY', // Asia
  ]

  // Recently added visa-free countries (higher premium)
  private newVisaFreeCountries = ['FR', 'DE', 'IT', 'ES', 'NL']

  constructor(private inventoryService: InventoryService) {
    this.prisma = new PrismaClient()
  }

  /**
   * Dynamic pricing algorithm
   * Formula: USD = CNY Base × Exchange Rate × 1.01 × Demand × Scarcity
   */
  async calculatePrice(criteria: PricingCriteria): Promise<PricingResult> {
    const { hotelId, roomTypeId, date, guestNationality } = criteria

    this.logger.log(`Calculating price for ${hotelId}/${roomTypeId} on ${date}`)

    // 1. Get base price from room type
    const roomType = await this.prisma.roomType.findUnique({
      where: { id: roomTypeId },
      include: { hotel: true },
    })

    if (!roomType) {
      throw new Error('Room type not found')
    }

    const basePriceCny = roomType.hotel.basePrice?.toNumber() || 450

    // 2. Get real-time exchange rate (CNY to USD)
    const exchangeRate = await this.getExchangeRate()
    const basePriceUsd = basePriceCny * exchangeRate * 1.01 // 1% buffer

    // 3. Calculate demand multiplier
    const demandMultiplier = this.calculateDemandMultiplier(
      guestNationality,
      date
    )

    // 4. Calculate scarcity multiplier based on inventory
    const scarcityMultiplier = await this.calculateScarcityMultiplier(
      hotelId,
      roomTypeId,
      date
    )

    // 5. Calculate visa policy multiplier
    const visaPolicyMultiplier = this.calculateVisaPolicyMultiplier(
      guestNationality
    )

    // 6. Calculate final price
    const adjustedPrice =
      basePriceUsd *
      demandMultiplier *
      scarcityMultiplier *
      visaPolicyMultiplier

    // 7. Round to 2 decimal places
    const finalPrice = Math.round(adjustedPrice * 100) / 100

    // Price valid for 15 minutes
    const validUntil = new Date(Date.now() + 15 * 60 * 1000).toISOString()

    return {
      basePrice: basePriceUsd,
      adjustedPrice: finalPrice,
      currency: 'USD',
      factors: {
        exchangeRate,
        demandMultiplier,
        scarcityMultiplier,
        visaPolicyMultiplier,
      },
      breakdown: {
        baseCny: basePriceCny,
        baseUsd: basePriceUsd,
        demandPremium: basePriceUsd * (demandMultiplier - 1),
        scarcityPremium: basePriceUsd * (scarcityMultiplier - 1),
        visaPremium: basePriceUsd * (visaPolicyMultiplier - 1),
      },
      validUntil,
    }
  }

  /**
   * Batch calculate prices for a date range
   */
  async batchCalculate(
    hotelId: string,
    roomTypeId: string,
    startDate: string,
    endDate: string
  ) {
    const prices = []
    const start = new Date(startDate)
    const end = new Date(endDate)

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0]
      try {
        const price = await this.calculatePrice({
          hotelId,
          roomTypeId,
          date: dateStr,
        })
        prices.push({ date: dateStr, ...price })
      } catch (error) {
        this.logger.error(`Failed to calculate price for ${dateStr}`, error)
      }
    }

    return prices
  }

  /**
   * Get current pricing factors explanation
   */
  async getPricingFactors() {
    return {
      exchangeRate: {
        cnyToUsd: await this.getExchangeRate(),
        buffer: '1%',
        updatedAt: new Date().toISOString(),
      },
      demandFactors: {
        visaFreePremium: '15% for new visa-free countries',
        highSeason: '20% during Chinese holidays',
      },
      scarcityFactors: {
        otaSoldOut: '20% when OTA pool empty',
        lowInventory: '10% when < 5 rooms',
      },
    }
  }

  /**
   * Get real-time exchange rate
   * In production, this would call an external API
   */
  private async getExchangeRate(): Promise<number> {
    // Mock exchange rate - in production use xe.com or similar API
    // CNY to USD (1 CNY = ~0.138 USD as of 2024)
    return 0.1385
  }

  /**
   * Calculate demand multiplier based on nationality and season
   */
  private calculateDemandMultiplier(
    nationality?: string,
    date?: string
  ): number {
    let multiplier = 1.0

    // Visa policy impact
    if (nationality && this.newVisaFreeCountries.includes(nationality)) {
      multiplier += 0.15 // 15% premium for new visa-free countries
      this.logger.log(`New visa-free country premium applied: ${nationality}`)
    } else if (nationality && this.visaFreeCountries.includes(nationality)) {
      multiplier += 0.05 // 5% premium for regular visa-free countries
    }

    // Seasonality
    if (date) {
      const d = new Date(date)
      const month = d.getMonth() + 1

      // Chinese high seasons
      const highSeasonMonths = [4, 5, 9, 10] // Spring and Autumn
      if (highSeasonMonths.includes(month)) {
        multiplier += 0.1 // 10% high season premium
      }

      // Chinese holidays (simplified - use actual dates in production)
      const day = d.getDate()
      if ((month === 10 && day >= 1 && day <= 7) || // Golden Week
          (month === 2 && day >= 10 && day <= 17)) { // Spring Festival
        multiplier += 0.2 // 20% holiday premium
      }
    }

    return multiplier
  }

  /**
   * Calculate scarcity multiplier based on inventory levels
   */
  private async calculateScarcityMultiplier(
    hotelId: string,
    roomTypeId: string,
    date: string
  ): Promise<number> {
    try {
      // Get availability
      const availability = await this.inventoryService.getAvailability(
        hotelId,
        roomTypeId,
        date,
        date
      )

      if (!availability || availability.length === 0) {
        return 1.0
      }

      const day = availability[0]
      const totalAvailable = (day?.ota || 0) + (day?.direct || 0)

      // Scarcity pricing tiers
      if (totalAvailable === 0) {
        return 1.3 // 30% premium when sold out (waitlist pricing)
      } else if (totalAvailable < 3) {
        return 1.2 // 20% premium when very limited
      } else if (totalAvailable < 5) {
        return 1.1 // 10% premium when limited
      }

      // OTA pool empty but direct available
      if (day?.ota === 0 && day?.direct > 0) {
        return 1.15 // 15% premium for exclusive direct inventory
      }

      return 1.0 // Normal pricing
    } catch (error) {
      this.logger.error('Failed to calculate scarcity multiplier', error)
      return 1.0
    }
  }

  /**
   * Calculate visa policy multiplier
   */
  private calculateVisaPolicyMultiplier(nationality?: string): number {
    if (!nationality) return 1.0

    // 144-hour visa-free transit policy impact
    if (this.newVisaFreeCountries.includes(nationality)) {
      return 1.05 // 5% premium due to increased demand
    }

    return 1.0
  }
}
