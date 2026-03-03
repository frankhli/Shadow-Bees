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
var CloudbedsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudbedsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const database_1 = require("@tiaohai/database");
const inventory_service_1 = require("../inventory/inventory.service");
let CloudbedsService = CloudbedsService_1 = class CloudbedsService {
    constructor(configService, inventoryService) {
        this.configService = configService;
        this.inventoryService = inventoryService;
        this.logger = new common_1.Logger(CloudbedsService_1.name);
        this.apiBaseUrl = 'https://api.cloudbeds.com/api/v1.2';
        this.prisma = new database_1.PrismaClient();
    }
    getOAuthUrl(hotelId) {
        const clientId = this.configService.get('CLOUDBEDS_CLIENT_ID');
        const redirectUri = `${this.configService.get('API_URL')}/pms/cloudbeds/callback`;
        const params = new URLSearchParams({
            client_id: clientId || '',
            redirect_uri: redirectUri,
            response_type: 'code',
            state: hotelId,
            scope: 'read write',
        });
        return `https://hotels.cloudbeds.com/api/v1.1/oauth?${params.toString()}`;
    }
    async exchangeCodeForToken(code, hotelId) {
        try {
            const clientId = this.configService.get('CLOUDBEDS_CLIENT_ID');
            const clientSecret = this.configService.get('CLOUDBEDS_CLIENT_SECRET');
            const redirectUri = `${this.configService.get('API_URL')}/pms/cloudbeds/callback`;
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
            });
            if (!response.ok) {
                throw new Error('Token exchange failed');
            }
            const data = await response.json();
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
            });
            this.logger.log(`Cloudbeds connected for hotel ${hotelId}`);
            await this.syncInventory(hotelId);
            return { success: true, message: 'Cloudbeds connected successfully' };
        }
        catch (error) {
            this.logger.error('Cloudbeds OAuth error:', error);
            return { success: false, message: error.message };
        }
    }
    async refreshToken(hotelId) {
        try {
            const hotel = await this.prisma.hotel.findUnique({
                where: { id: hotelId },
                select: { pmsConfig: true },
            });
            if (!hotel?.pmsConfig)
                return null;
            const config = hotel.pmsConfig;
            const clientId = this.configService.get('CLOUDBEDS_CLIENT_ID');
            const clientSecret = this.configService.get('CLOUDBEDS_CLIENT_SECRET');
            const response = await fetch(`${this.apiBaseUrl}/access_token`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    grant_type: 'refresh_token',
                    client_id: clientId,
                    client_secret: clientSecret,
                    refresh_token: config.refreshToken,
                }),
            });
            if (!response.ok) {
                throw new Error('Token refresh failed');
            }
            const data = await response.json();
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
            });
            return data.access_token;
        }
        catch (error) {
            this.logger.error('Token refresh error:', error);
            return null;
        }
    }
    async getAccessToken(hotelId) {
        const hotel = await this.prisma.hotel.findUnique({
            where: { id: hotelId },
            select: { pmsConfig: true },
        });
        if (!hotel?.pmsConfig)
            return null;
        const config = hotel.pmsConfig;
        if (config.expiresAt && config.expiresAt < Date.now() + 60000) {
            return this.refreshToken(hotelId);
        }
        return config.accessToken;
    }
    async syncInventory(hotelId) {
        try {
            const accessToken = await this.getAccessToken(hotelId);
            if (!accessToken) {
                throw new Error('Not connected to Cloudbeds');
            }
            const hotel = await this.prisma.hotel.findUnique({
                where: { id: hotelId },
                select: { pmsConfig: true },
            });
            const propertyId = hotel?.pmsConfig?.propertyId;
            const roomTypesResponse = await fetch(`${this.apiBaseUrl}/getRoomTypes?propertyID=${propertyId}`, {
                headers: { 'Authorization': `Bearer ${accessToken}` },
            });
            if (!roomTypesResponse.ok) {
                throw new Error('Failed to fetch room types');
            }
            const roomTypesData = await roomTypesResponse.json();
            const startDate = new Date().toISOString().split('T')[0];
            const endDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
                .toISOString()
                .split('T')[0];
            const availabilityResponse = await fetch(`${this.apiBaseUrl}/getAvailability?propertyID=${propertyId}&startDate=${startDate}&endDate=${endDate}`, {
                headers: { 'Authorization': `Bearer ${accessToken}` },
            });
            if (!availabilityResponse.ok) {
                throw new Error('Failed to fetch availability');
            }
            const availabilityData = await availabilityResponse.json();
            let updated = 0;
            let errors = 0;
            for (const roomType of roomTypesData.data || []) {
                try {
                    const mappedRoomTypeId = await this.getOrCreateRoomTypeMapping(hotelId, roomType.roomTypeID, roomType.name);
                    const roomAvailability = availabilityData.data?.filter((a) => a.roomTypeID === roomType.roomTypeID) || [];
                    for (const day of roomAvailability) {
                        await this.inventoryService.updateInventory(hotelId, mappedRoomTypeId, day.date, {
                            ota: Math.floor(day.availableRooms * 0.6),
                            direct: Math.floor(day.availableRooms * 0.4),
                        });
                        updated++;
                    }
                }
                catch (error) {
                    this.logger.error(`Failed to sync room type ${roomType.roomTypeID}:`, error);
                    errors++;
                }
            }
            this.logger.log(`Cloudbeds sync complete: ${updated} updated, ${errors} errors`);
            return { success: true, updated, errors };
        }
        catch (error) {
            this.logger.error('Cloudbeds sync error:', error);
            return { success: false, updated: 0, errors: 1 };
        }
    }
    async pushInventoryUpdate(hotelId, roomTypeId, date, availability) {
        try {
            const accessToken = await this.getAccessToken(hotelId);
            if (!accessToken)
                return false;
            const mapping = await this.prisma.roomType.findUnique({
                where: { id: roomTypeId },
                select: { pmsConfig: true },
            });
            const cloudbedsRoomTypeId = mapping?.pmsConfig?.cloudbedsId;
            if (!cloudbedsRoomTypeId)
                return false;
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
            });
            return response.ok;
        }
        catch (error) {
            this.logger.error('Push inventory error:', error);
            return false;
        }
    }
    async getReservations(hotelId, startDate, endDate) {
        try {
            const accessToken = await this.getAccessToken(hotelId);
            if (!accessToken)
                return [];
            const hotel = await this.prisma.hotel.findUnique({
                where: { id: hotelId },
                select: { pmsConfig: true },
            });
            const propertyId = hotel?.pmsConfig?.propertyId;
            const response = await fetch(`${this.apiBaseUrl}/getReservations?propertyID=${propertyId}&startDate=${startDate}&endDate=${endDate}`, {
                headers: { 'Authorization': `Bearer ${accessToken}` },
            });
            if (!response.ok)
                return [];
            const data = await response.json();
            return data.data || [];
        }
        catch (error) {
            this.logger.error('Get reservations error:', error);
            return [];
        }
    }
    async getOrCreateRoomTypeMapping(hotelId, cloudbedsRoomTypeId, name) {
        const existing = await this.prisma.roomType.findFirst({
            where: {
                hotelId,
                pmsConfig: {
                    path: ['cloudbedsId'],
                    equals: cloudbedsRoomTypeId,
                },
            },
        });
        if (existing) {
            return existing.id;
        }
        const roomType = await this.prisma.roomType.create({
            data: {
                hotelId,
                name,
                nameEn: name,
                roomCount: 10,
                inventoryPool: { ota: 5, direct: 5 },
                pmsConfig: { cloudbedsId: cloudbedsRoomTypeId },
            },
        });
        return roomType.id;
    }
};
exports.CloudbedsService = CloudbedsService;
exports.CloudbedsService = CloudbedsService = CloudbedsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        inventory_service_1.InventoryService])
], CloudbedsService);
//# sourceMappingURL=cloudbeds.service.js.map