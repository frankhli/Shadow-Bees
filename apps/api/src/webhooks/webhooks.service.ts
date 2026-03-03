import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InventoryService } from '../inventory/inventory.service'
import * as crypto from 'crypto'

@Injectable()
export class WebhooksService {
  private readonly logger = new Logger(WebhooksService.name)

  constructor(
    private configService: ConfigService,
    private inventoryService: InventoryService
  ) {}

  async handleCloudbedsWebhook(payload: any, signature: string) {
    try {
      // Verify webhook signature
      const webhookSecret = this.configService.get<string>('CLOUDBEDS_WEBHOOK_SECRET')
      
      if (webhookSecret && signature) {
        const isValid = this.verifyCloudbedsSignature(payload, signature, webhookSecret)
        if (!isValid) {
          this.logger.warn('Invalid Cloudbeds webhook signature')
          return { status: 'error', message: 'Invalid signature' }
        }
      }

      // Process webhook based on event type
      const eventType = payload.event_type || payload.event
      
      this.logger.log(`Received Cloudbeds webhook: ${eventType}`)

      switch (eventType) {
        case 'reservation_created':
        case 'reservation_modified':
        case 'reservation_cancelled':
          await this.handleReservationChange(payload)
          break

        case 'availability_updated':
          await this.handleAvailabilityUpdate(payload)
          break

        case 'rate_updated':
          await this.handleRateUpdate(payload)
          break

        default:
          this.logger.log(`Unhandled event type: ${eventType}`)
      }

      return { status: 'success', received: true }
    } catch (error: any) {
      this.logger.error(`Webhook processing error: ${error.message}`, error.stack)
      return { status: 'error', message: error.message }
    }
  }

  async handleGenericPMSWebhook(payload: any, headers: any) {
    this.logger.log('Received generic PMS webhook', { payload, headers })
    
    // Generic processing - can be extended for other PMS providers
    return { status: 'success', received: true }
  }

  private async handleReservationChange(payload: any) {
    const { property_id, reservation } = payload

    // Map Cloudbeds room type to our room type
    const roomTypeMapping = await this.getRoomTypeMapping(property_id)
    
    for (const room of reservation.rooms || []) {
      const mappedRoomTypeId = roomTypeMapping[room.room_type_id]
      
      if (mappedRoomTypeId) {
        // Update inventory for affected dates
        const checkIn = new Date(reservation.check_in)
        const checkOut = new Date(reservation.check_out)
        
        for (let d = new Date(checkIn); d < checkOut; d.setDate(d.getDate() + 1)) {
          const dateStr = d.toISOString().split('T')[0]
          
          // Decrease available rooms
          // In real implementation, you'd query current availability first
          await this.inventoryService.updateInventory(
            property_id,
            mappedRoomTypeId,
            dateStr,
            { ota: 0, direct: 0 } // Placeholder - should calculate actual availability
          )
        }
      }
    }

    this.logger.log(`Processed reservation change for property ${property_id}`)
  }

  private async handleAvailabilityUpdate(payload: any) {
    const { property_id, room_type_id, availability } = payload

    const roomTypeMapping = await this.getRoomTypeMapping(property_id)
    const mappedRoomTypeId = roomTypeMapping[room_type_id]

    if (mappedRoomTypeId) {
      for (const item of availability || []) {
        await this.inventoryService.updateInventory(
          property_id,
          mappedRoomTypeId,
          item.date,
          { ota: item.ota_available, direct: item.direct_available }
        )
      }
    }

    this.logger.log(`Processed availability update for property ${property_id}`)
  }

  private async handleRateUpdate(payload: any) {
    // Handle rate changes from PMS
    this.logger.log('Rate update received', payload)
    // Implementation depends on pricing strategy
  }

  private async getRoomTypeMapping(propertyId: string): Promise<Record<string, string>> {
    // In production, this would come from a database mapping table
    // For now, return a mock mapping
    return {
      'cloudbeds_room_1': 'our_room_1',
      'cloudbeds_room_2': 'our_room_2',
    }
  }

  private verifyCloudbedsSignature(payload: any, signature: string, secret: string): boolean {
    try {
      const hmac = crypto.createHmac('sha256', secret)
      hmac.update(JSON.stringify(payload))
      const computedSignature = hmac.digest('hex')
      
      return crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(computedSignature)
      )
    } catch (error) {
      return false
    }
  }
}
