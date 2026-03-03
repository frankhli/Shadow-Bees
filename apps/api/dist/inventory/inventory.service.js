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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
const common_1 = require("@nestjs/common");
const database_1 = require("@tiaohai/database");
let InventoryService = class InventoryService {
    constructor() {
        this.prisma = new database_1.PrismaClient();
    }
    async updateInventory(hotelId, roomTypeId, date, availability) {
        await this.prisma.roomType.update({
            where: { id: roomTypeId },
            data: {
                inventoryPool: availability,
            },
        });
        await this.prisma.inventorySyncLog.create({
            data: {
                hotelId,
                roomTypeId,
                source: 'cloudbeds',
                availabilityDate: new Date(date),
                roomsAvailable: availability.ota + availability.direct,
                syncStatus: 'SUCCESS',
            },
        });
        return { success: true };
    }
    async getAvailability(hotelId, roomTypeId, startDate, endDate) {
        const roomType = await this.prisma.roomType.findUnique({
            where: { id: roomTypeId },
        });
        if (!roomType) {
            throw new Error('Room type not found');
        }
        const availability = [];
        const start = new Date(startDate);
        const end = new Date(endDate);
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            const dateStr = d.toISOString().split('T')[0];
            const syncLog = await this.prisma.inventorySyncLog.findFirst({
                where: {
                    hotelId,
                    roomTypeId,
                    availabilityDate: new Date(dateStr),
                },
                orderBy: { syncedAt: 'desc' },
            });
            const pool = roomType.inventoryPool;
            availability.push({
                date: dateStr,
                ota: syncLog ? Math.floor(syncLog.roomsAvailable * 0.6) : pool?.ota || 0,
                direct: syncLog ? Math.floor(syncLog.roomsAvailable * 0.4) : pool?.direct || 0,
                lastSynced: syncLog?.syncedAt,
            });
        }
        return availability;
    }
    async bulkUpdateFromCloudbeds(hotelId, updates) {
        const results = [];
        for (const update of updates) {
            try {
                const otaPool = Math.floor(update.available * 0.6);
                const directPool = Math.floor(update.available * 0.4);
                await this.updateInventory(hotelId, update.roomTypeId, update.date, {
                    ota: otaPool,
                    direct: directPool,
                });
                results.push({
                    roomTypeId: update.roomTypeId,
                    date: update.date,
                    status: 'success',
                });
            }
            catch (error) {
                results.push({
                    roomTypeId: update.roomTypeId,
                    date: update.date,
                    status: 'error',
                    error: error.message,
                });
            }
        }
        return results;
    }
    async getSyncHistory(hotelId, limit = 50) {
        return this.prisma.inventorySyncLog.findMany({
            where: { hotelId },
            orderBy: { syncedAt: 'desc' },
            take: limit,
        });
    }
};
exports.InventoryService = InventoryService;
exports.InventoryService = InventoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], InventoryService);
//# sourceMappingURL=inventory.service.js.map