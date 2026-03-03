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
var PricingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricingService = void 0;
const common_1 = require("@nestjs/common");
const database_1 = require("@tiaohai/database");
const inventory_service_1 = require("../inventory/inventory.service");
let PricingService = PricingService_1 = class PricingService {
    constructor(inventoryService) {
        this.inventoryService = inventoryService;
        this.logger = new common_1.Logger(PricingService_1.name);
        this.visaFreeCountries = [
            'US', 'CA', 'UK', 'AU', 'NZ',
            'DE', 'FR', 'IT', 'ES', 'NL',
            'JP', 'KR', 'SG', 'MY',
        ];
        this.newVisaFreeCountries = ['FR', 'DE', 'IT', 'ES', 'NL'];
        this.prisma = new database_1.PrismaClient();
    }
    async calculatePrice(criteria) {
        const { hotelId, roomTypeId, date, guestNationality } = criteria;
        this.logger.log(`Calculating price for ${hotelId}/${roomTypeId} on ${date}`);
        const roomType = await this.prisma.roomType.findUnique({
            where: { id: roomTypeId },
            include: { hotel: true },
        });
        if (!roomType) {
            throw new Error('Room type not found');
        }
        const basePriceCny = roomType.hotel.basePrice?.toNumber() || 450;
        const exchangeRate = await this.getExchangeRate();
        const basePriceUsd = basePriceCny * exchangeRate * 1.01;
        const demandMultiplier = this.calculateDemandMultiplier(guestNationality, date);
        const scarcityMultiplier = await this.calculateScarcityMultiplier(hotelId, roomTypeId, date);
        const visaPolicyMultiplier = this.calculateVisaPolicyMultiplier(guestNationality);
        const adjustedPrice = basePriceUsd *
            demandMultiplier *
            scarcityMultiplier *
            visaPolicyMultiplier;
        const finalPrice = Math.round(adjustedPrice * 100) / 100;
        const validUntil = new Date(Date.now() + 15 * 60 * 1000).toISOString();
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
        };
    }
    async batchCalculate(hotelId, roomTypeId, startDate, endDate) {
        const prices = [];
        const start = new Date(startDate);
        const end = new Date(endDate);
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            const dateStr = d.toISOString().split('T')[0];
            try {
                const price = await this.calculatePrice({
                    hotelId,
                    roomTypeId,
                    date: dateStr,
                });
                prices.push({ date: dateStr, ...price });
            }
            catch (error) {
                this.logger.error(`Failed to calculate price for ${dateStr}`, error);
            }
        }
        return prices;
    }
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
        };
    }
    async getExchangeRate() {
        return 0.1385;
    }
    calculateDemandMultiplier(nationality, date) {
        let multiplier = 1.0;
        if (nationality && this.newVisaFreeCountries.includes(nationality)) {
            multiplier += 0.15;
            this.logger.log(`New visa-free country premium applied: ${nationality}`);
        }
        else if (nationality && this.visaFreeCountries.includes(nationality)) {
            multiplier += 0.05;
        }
        if (date) {
            const d = new Date(date);
            const month = d.getMonth() + 1;
            const highSeasonMonths = [4, 5, 9, 10];
            if (highSeasonMonths.includes(month)) {
                multiplier += 0.1;
            }
            const day = d.getDate();
            if ((month === 10 && day >= 1 && day <= 7) ||
                (month === 2 && day >= 10 && day <= 17)) {
                multiplier += 0.2;
            }
        }
        return multiplier;
    }
    async calculateScarcityMultiplier(hotelId, roomTypeId, date) {
        try {
            const availability = await this.inventoryService.getAvailability(hotelId, roomTypeId, date, date);
            if (!availability || availability.length === 0) {
                return 1.0;
            }
            const day = availability[0];
            const totalAvailable = (day?.ota || 0) + (day?.direct || 0);
            if (totalAvailable === 0) {
                return 1.3;
            }
            else if (totalAvailable < 3) {
                return 1.2;
            }
            else if (totalAvailable < 5) {
                return 1.1;
            }
            if (day?.ota === 0 && day?.direct > 0) {
                return 1.15;
            }
            return 1.0;
        }
        catch (error) {
            this.logger.error('Failed to calculate scarcity multiplier', error);
            return 1.0;
        }
    }
    calculateVisaPolicyMultiplier(nationality) {
        if (!nationality)
            return 1.0;
        if (this.newVisaFreeCountries.includes(nationality)) {
            return 1.05;
        }
        return 1.0;
    }
};
exports.PricingService = PricingService;
exports.PricingService = PricingService = PricingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [inventory_service_1.InventoryService])
], PricingService);
//# sourceMappingURL=pricing.service.js.map