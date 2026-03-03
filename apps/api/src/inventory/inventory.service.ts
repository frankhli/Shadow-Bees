import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@tiaohai/database'

@Injectable()
export class InventoryService {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async updateInventory(
    hotelId: string,
    roomTypeId: string,
    date: string,
    availability: { ota: number; direct: number }
  ) {
    // Update room type inventory pool
    await this.prisma.roomType.update({
      where: { id: roomTypeId },
      data: {
        inventoryPool: availability,
      },
    })

    // Log sync
    await this.prisma.inventorySyncLog.create({
      data: {
        hotelId,
        roomTypeId,
        source: 'cloudbeds',
        availabilityDate: new Date(date),
        roomsAvailable: availability.ota + availability.direct,
        syncStatus: 'SUCCESS',
      },
    })

    return { success: true }
  }

  async getAvailability(hotelId: string, roomTypeId: string, startDate: string, endDate: string) {
    // Get current inventory
    const roomType = await this.prisma.roomType.findUnique({
      where: { id: roomTypeId },
    })

    if (!roomType) {
      throw new Error('Room type not found')
    }

    // Generate daily availability
    const availability = []
    const start = new Date(startDate)
    const end = new Date(endDate)

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0]
      
      // Get sync logs for this date
      const syncLog = await this.prisma.inventorySyncLog.findFirst({
        where: {
          hotelId,
          roomTypeId,
          availabilityDate: new Date(dateStr),
        },
        orderBy: { syncedAt: 'desc' },
      })

      const pool = roomType.inventoryPool as any
      
      availability.push({
        date: dateStr,
        ota: syncLog ? Math.floor(syncLog.roomsAvailable * 0.6) : pool?.ota || 0,
        direct: syncLog ? Math.floor(syncLog.roomsAvailable * 0.4) : pool?.direct || 0,
        lastSynced: syncLog?.syncedAt,
      })
    }

    return availability
  }

  async bulkUpdateFromCloudbeds(
    hotelId: string,
    updates: Array<{
      roomTypeId: string
      date: string
      available: number
    }>
  ) {
    const results = []

    for (const update of updates) {
      try {
        // Distribute availability between OTA and Direct pools (60/40 split)
        const otaPool = Math.floor(update.available * 0.6)
        const directPool = Math.floor(update.available * 0.4)

        await this.updateInventory(hotelId, update.roomTypeId, update.date, {
          ota: otaPool,
          direct: directPool,
        })

        results.push({
          roomTypeId: update.roomTypeId,
          date: update.date,
          status: 'success',
        })
      } catch (error: any) {
        results.push({
          roomTypeId: update.roomTypeId,
          date: update.date,
          status: 'error',
          error: error.message,
        })
      }
    }

    return results
  }

  async getSyncHistory(hotelId: string, limit = 50) {
    return this.prisma.inventorySyncLog.findMany({
      where: { hotelId },
      orderBy: { syncedAt: 'desc' },
      take: limit,
    })
  }
}
