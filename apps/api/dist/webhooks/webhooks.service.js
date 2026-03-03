"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var WebhooksService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhooksService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const inventory_service_1 = require("../inventory/inventory.service");
const crypto = require("crypto");
let WebhooksService = WebhooksService_1 = class WebhooksService {
    constructor(configService, inventoryService) {
        this.configService = configService;
        this.inventoryService = inventoryService;
        this.logger = new common_1.Logger(WebhooksService_1.name);
    }
    async handleCloudbedsWebhook(payload, signature) {
        try {
            const webhookSecret = this.configService.get('CLOUDBEDS_WEBHOOK_SECRET');
            if (webhookSecret && signature) {
                const isValid = this.verifyCloudbedsSignature(payload, signature, webhookSecret);
                if (!isValid) {
                    this.logger.warn('Invalid Cloudbeds webhook signature');
                    return { status: 'error', message: 'Invalid signature' };
                }
            }
            const eventType = payload.event_type || payload.event;
            this.logger.log(`Received Cloudbeds webhook: ${eventType}`);
            switch (eventType) {
                case 'reservation_created':
                case 'reservation_modified':
                case 'reservation_cancelled':
                    await this.handleReservationChange(payload);
                    break;
                case 'availability_updated':
                    await this.handleAvailabilityUpdate(payload);
                    break;
                case 'rate_updated':
                    await this.handleRateUpdate(payload);
                    break;
                default:
                    this.logger.log(`Unhandled event type: ${eventType}`);
            }
            return { status: 'success', received: true };
        }
        catch (error) {
            this.logger.error(`Webhook processing error: ${error.message}`, error.stack);
            return { status: 'error', message: error.message };
        }
    }
    async handleGenericPMSWebhook(payload, headers) {
        this.logger.log('Received generic PMS webhook', { payload, headers });
        return { status: 'success', received: true };
    }
    async handleReservationChange(payload) {
        const { property_id, reservation } = payload;
        const roomTypeMapping = await this.getRoomTypeMapping(property_id);
        for (const room of reservation.rooms || []) {
            const mappedRoomTypeId = roomTypeMapping[room.room_type_id];
            if (mappedRoomTypeId) {
                const checkIn = new Date(reservation.check_in);
                const checkOut = new Date(reservation.check_out);
                for (let d = new Date(checkIn); d < checkOut; d.setDate(d.getDate() + 1)) {
                    const dateStr = d.toISOString().split('T')[0];
                    await this.inventoryService.updateInventory(property_id, mappedRoomTypeId, dateStr, { ota: 0, direct: 0 });
                }
            }
        }
        this.logger.log(`Processed reservation change for property ${property_id}`);
    }
    async handleAvailabilityUpdate(payload) {
        const { property_id, room_type_id, availability } = payload;
        const roomTypeMapping = await this.getRoomTypeMapping(property_id);
        const mappedRoomTypeId = roomTypeMapping[room_type_id];
        if (mappedRoomTypeId) {
            for (const item of availability || []) {
                await this.inventoryService.updateInventory(property_id, mappedRoomTypeId, item.date, { ota: item.ota_available, direct: item.direct_available });
            }
        }
        this.logger.log(`Processed availability update for property ${property_id}`);
    }
    async handleRateUpdate(payload) {
        this.logger.log('Rate update received', payload);
    }
    async getRoomTypeMapping(propertyId) {
        return {
            'cloudbeds_room_1': 'our_room_1',
            'cloudbeds_room_2': 'our_room_2',
        };
    }
    verifyCloudbedsSignature(payload, signature, secret) {
        try {
            const hmac = crypto.createHmac('sha256', secret);
            hmac.update(JSON.stringify(payload));
            const computedSignature = hmac.digest('hex');
            return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(computedSignature));
        }
        catch (error) {
            return false;
        }
    }
};
exports.WebhooksService = WebhooksService;
exports.WebhooksService = WebhooksService = WebhooksService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        inventory_service_1.InventoryService])
], WebhooksService);
//# sourceMappingURL=webhooks.service.js.map