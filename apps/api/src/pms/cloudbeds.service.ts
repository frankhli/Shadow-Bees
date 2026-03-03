import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaClient } from '@tiaohai/database'
import { InventoryService } from '../inventory/inventory.service'

@Injectable()
export class CloudbedsService {
  private readonly logger = new Logger(CloudbedsService.name)
  private prisma: PrismaClient
  private apiBaseUrl = 'https://api.cloudbeds.com/api/v1.2'

  constructor(
    private configService: ConfigService,
    private inventoryService: InventoryService
  ) {
    this.prisma = new PrismaClient()
  }

  /**
   * Get OAuth URL for Cloudbeds connection
   */
  getOAuthUrl(hotelId: string): string {
    const clientId = this.configService.get<string>('CLOUDBEDS_CLIENT_ID')
    const redirectUri = `${this.configService.get('API_URL')}/pms/cloudbeds/callback`
    
    const params = new URLSearchParams({
      client_id: clientId || '',
      redirect_uri: redirectUri,
      response_type: 'code',
      state: hotelId, // Pass hotelId in state for callback
      scope: 'read write',
    })

    return `https://hotels.cloudbeds.com/api/v1.1/oauth?${params.toString()}`
  }

  /**
   * Exchange authorization code for access token
   */
  async exchangeCodeForToken(code: string, hotelId: string): Promise<{
    success: boolean
    message?: string
  }> {
    try {
      const clientId = this.configService.get<string>('CLOUDBEDS_CLIENT_ID')
      const clientSecret = this.configService.get<string>('CLOUDBEDS_CLIENT_SECRET')
      const redirectUri = `${this.configService.get('API_URL')}/pms/cloudbeds/callback`

      const response = await fetch(`${this.apiBaseUrl}/access_token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grant_type: 'authorization_code',
          client_id: clientId,
          client_secret: clientSecret,
          code,
          redirect_uri: redirectUri,
        }),
      })

      if (!response.ok) {
        throw new Error('Token exchange failed')
      }

      const data = await response.json()

      // Store tokens in database
      await this.prisma.hotel.update({
        where: { id: hotelId },
        data: {
          pmsType: 'cloudbeds',
          pmsConfig: {
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            expiresAt: Date.now() + data.expires_in * 1000,
            propertyId: data.property_id,
          },
        },
      })

      this.logger.log(`Cloudbeds connected for hotel ${hotelId}`)

      // Trigger initial sync
      await this.syncInventory(hotelId)

      return { success: true, message: 'Cloudbeds connected successfully' }
    } catch (error) {
      this.logger.error('Cloudbeds OAuth error:', error)
      return { success: false, message: error.message }
    }
  }

  /**
   * Refresh access token
   */
  async refreshToken(hotelId: string): Promise<string | null> {
    try {
      const hotel = await this.prisma.hotel.findUnique({
        where: { id: hotelId },
        select: { pmsConfig: true },
      })

      if (!hotel?.pmsConfig) return null

      const config = hotel.pmsConfig as any
      const clientId = this.configService.get<string>('CLOUDBEDS_CLIENT_ID')
      const clientSecret = this.configService.get<string>('CLOUDBEDS_CLIENT_SECRET')

      const response = await fetch(`${this.apiBaseUrl}/access_token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grant_type: 'refresh_token',
          client_id: clientId,
          client_secret: clientSecret,
          refresh_token: config.refreshToken,
        }),
      })

      if (!response.ok) {
        throw new Error('Token refresh failed')
      }

      const data = await response.json()

      // Update tokens
      await this.prisma.hotel.update({
        where: { id: hotelId },
        data: {
          pmsConfig: {
            ...config,
            accessToken: data.access_token,
            refreshToken: data.refresh_token || config.refreshToken,
            expiresAt: Date.now() + data.expires_in * 1000,
          },
        },
      })

      return data.access_token
    } catch (error) {
      this.logger.error('Token refresh error:', error)
      return null
    }
  }

  /**
   * Get access token for API calls
   */
  private async getAccessToken(hotelId: string): Promise<string | null> {
    const hotel = await this.prisma.hotel.findUnique({
      where: { id: hotelId },
      select: { pmsConfig: true },
    })

    if (!hotel?.pmsConfig) return null

    const config = hotel.pmsConfig as any

    // Check if token needs refresh
    if (config.expiresAt && config.expiresAt < Date.now() + 60000) {
      return this.refreshToken(hotelId)
    }

    return config.accessToken
  }

  /**
   * Sync inventory from Cloudbeds
   */
  async syncInventory(hotelId: string): Promise<{
    success: boolean
    updated: number
    errors: number
  }> {
    try {
      const accessToken = await this.getAccessToken(hotelId)
      if (!accessToken) {
        throw new Error('Not connected to Cloudbeds')
      }

      const hotel = await this.prisma.hotel.findUnique({
        where: { id: hotelId },
        select: { pmsConfig: true },
      })

      const propertyId = (hotel?.pmsConfig as any)?.propertyId

      // Get room types from Cloudbeds
      const roomTypesResponse = await fetch(
        `${this.apiBaseUrl}/getRoomTypes?propertyID=${propertyId}`,
        {
          headers: { 'Authorization': `Bearer ${accessToken}` },
        }
      )

      if (!roomTypesResponse.ok) {
        throw new Error('Failed to fetch room types')
      }

      const roomTypesData = await roomTypesResponse.json()

      // Get availability for next 90 days
      const startDate = new Date().toISOString().split('T')[0]
      const endDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0]

      const availabilityResponse = await fetch(
        `${this.apiBaseUrl}/getAvailability?propertyID=${propertyId}&startDate=${startDate}&endDate=${endDate}`,
        {
          headers: { 'Authorization': `Bearer ${accessToken}` },
        }
      )

      if (!availabilityResponse.ok) {
        throw new Error('Failed to fetch availability')
      }

      const availabilityData = await availabilityResponse.json()

      // Process and update inventory
      let updated = 0
      let errors = 0

      for (const roomType of roomTypesData.data || []) {
        try {
          // Find or create room type mapping
          const mappedRoomTypeId = await this.getOrCreateRoomTypeMapping(
            hotelId,
            roomType.roomTypeID,
            roomType.name
          )

          // Update availability
          const roomAvailability = availabilityData.data?.filter(
            (a: any) => a.roomTypeID === roomType.roomTypeID
          ) || []

          for (const day of roomAvailability) {
            await this.inventoryService.updateInventory(
              hotelId,
              mappedRoomTypeId,
              day.date,
              {
                ota: Math.floor(day.availableRooms * 0.6),
                direct: Math.floor(day.availableRooms * 0.4),
              }
            )
            updated++
          }
        } catch (error) {
          this.logger.error(`Failed to sync room type ${roomType.roomTypeID}:`, error)
          errors++
        }
      }

      this.logger.log(`Cloudbeds sync complete: ${updated} updated, ${errors} errors`)

      return { success: true, updated, errors }
    } catch (error) {
      this.logger.error('Cloudbeds sync error:', error)
      return { success: false, updated: 0, errors: 1 }
    }
  }

  /**
   * Push inventory update to Cloudbeds (bidirectional)
   */
  async pushInventoryUpdate(
    hotelId: string,
    roomTypeId: string,
    date: string,
    availability: number
  ): Promise<boolean> {
    try {
      const accessToken = await this.getAccessToken(hotelId)
      if (!accessToken) return false

      // Get Cloudbeds room type ID
      const mapping = await this.prisma.roomType.findUnique({
        where: { id: roomTypeId },
        select: { pmsConfig: true },
      })

      const cloudbedsRoomTypeId = (mapping?.pmsConfig as any)?.cloudbedsId
      if (!cloudbedsRoomTypeId) return false

      // Push to Cloudbeds (mock - actual API may differ)
      const response = await fetch(`${this.apiBaseUrl}/updateAvailability`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomTypeID: cloudbedsRoomTypeId,
          date,
          availableRooms: availability,
        }),
      })

      return response.ok
    } catch (error) {
      this.logger.error('Push inventory error:', error)
      return false
    }
  }

  /**
   * Get reservations from Cloudbeds
   */
  async getReservations(
    hotelId: string,
    startDate: string,
    endDate: string
  ): Promise<any[]> {
    try {
      const accessToken = await this.getAccessToken(hotelId)
      if (!accessToken) return []

      const hotel = await this.prisma.hotel.findUnique({
        where: { id: hotelId },
        select: { pmsConfig: true },
      })

      const propertyId = (hotel?.pmsConfig as any)?.propertyId

      const response = await fetch(
        `${this.apiBaseUrl}/getReservations?propertyID=${propertyId}&startDate=${startDate}&endDate=${endDate}`,
        {
          headers: { 'Authorization': `Bearer ${accessToken}` },
        }
      )

      if (!response.ok) return []

      const data = await response.json()
      return data.data || []
    } catch (error) {
      this.logger.error('Get reservations error:', error)
      return []
    }
  }

  private async getOrCreateRoomTypeMapping(
    hotelId: string,
    cloudbedsRoomTypeId: string,
    name: string
  ): Promise<string> {
    // Check if mapping exists
    const existing = await this.prisma.roomType.findFirst({
      where: {
        hotelId,
        pmsConfig: {
          path: ['cloudbedsId'],
          equals: cloudbedsRoomTypeId,
        },
      },
    })

    if (existing) {
      return existing.id
    }

    // Create new room type
    const roomType = await this.prisma.roomType.create({
      data: {
        hotelId,
        name,
        nameEn: name,
        roomCount: 10, // Default, will be updated
        inventoryPool: { ota: 5, direct: 5 },
        pmsConfig: { cloudbedsId: cloudbedsRoomTypeId },
      },
    })

    return roomType.id
  }
}
