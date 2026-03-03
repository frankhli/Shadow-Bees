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
var DispatchService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DispatchService = void 0;
const common_1 = require("@nestjs/common");
const database_1 = require("@tiaohai/database");
let DispatchService = DispatchService_1 = class DispatchService {
    constructor() {
        this.logger = new common_1.Logger(DispatchService_1.name);
        this.prisma = new database_1.PrismaClient();
    }
    async findBestGuide(criteria) {
        const { city, date, languages, serviceType } = criteria;
        this.logger.log(`Finding guide for ${city} on ${date}, languages: ${languages.join(',')}`);
        const eligibleGuides = await this.getEligibleGuides(city, date, languages);
        if (eligibleGuides.length === 0) {
            return {
                success: false,
                alternatives: [],
            };
        }
        const scoredGuides = eligibleGuides.map((guide) => this.calculateGuideScore(guide, criteria));
        scoredGuides.sort((a, b) => b.score - a.score);
        const bestMatch = scoredGuides[0];
        const alternatives = scoredGuides.slice(1, 4).map((sg) => ({
            ...sg.guide,
            score: sg.score,
            factors: sg.factors,
        }));
        this.logger.log(`Best match: ${bestMatch.guide.name} with score ${bestMatch.score.toFixed(2)}`);
        return {
            success: true,
            guide: bestMatch.guide,
            score: bestMatch.score,
            factors: bestMatch.factors,
            alternatives,
        };
    }
    async assignGuide(orderId, guideId) {
        const order = await this.prisma.order.update({
            where: { id: orderId },
            data: {
                guideId,
                orderType: database_1.OrderType.BUNDLE,
            },
            include: {
                guide: true,
                hotel: true,
            },
        });
        if (order.serviceDate) {
            await this.markGuideBusy(guideId, order.serviceDate);
        }
        await this.updateGuideStats(guideId);
        this.logger.log(`Guide ${guideId} assigned to order ${orderId}`);
        return order;
    }
    async autoDispatch(orderId) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
            include: { hotel: true },
        });
        if (!order || !order.hotel) {
            return { success: false, message: 'Order not found' };
        }
        if (!order.serviceDate) {
            return { success: false, message: 'No service date specified' };
        }
        const result = await this.findBestGuide({
            city: order.hotel.city,
            date: order.serviceDate.toISOString().split('T')[0],
            languages: ['en'],
            serviceType: 'tour',
        });
        if (!result.success || !result.guide) {
            return { success: false, message: 'No available guides found' };
        }
        await this.assignGuide(orderId, result.guide.id);
        return {
            success: true,
            guide: result.guide,
        };
    }
    async getEligibleGuides(city, date, languages) {
        const guides = await this.prisma.guide.findMany({
            where: {
                city,
                status: database_1.GuideStatus.ACTIVE,
                licenseVerified: true,
                languages: { hasSome: languages },
            },
            include: {
                user: {
                    select: { email: true },
                },
            },
        });
        return guides.filter((guide) => this.isGuideAvailable(guide, date));
    }
    calculateGuideScore(guide, criteria) {
        const factors = {
            languageMatch: this.calculateLanguageScore(guide, criteria.languages),
            ratingScore: this.calculateRatingScore(guide),
            loadBalance: this.calculateLoadBalanceScore(guide),
            availability: this.calculateAvailabilityScore(guide, criteria.date),
            specialtyMatch: this.calculateSpecialtyScore(guide, criteria.serviceType),
        };
        const score = factors.languageMatch * 0.3 +
            factors.ratingScore * 0.25 +
            factors.loadBalance * 0.25 +
            factors.availability * 0.1 +
            factors.specialtyMatch * 0.1;
        return {
            guide,
            score,
            factors,
        };
    }
    calculateLanguageScore(guide, requiredLanguages) {
        const guideLanguages = guide.languages;
        const matches = requiredLanguages.filter((lang) => guideLanguages.includes(lang)).length;
        return matches / requiredLanguages.length;
    }
    calculateRatingScore(guide) {
        return guide.rating ? guide.rating.toNumber() / 5 : 0.8;
    }
    calculateLoadBalanceScore(guide) {
        const recentBookings = guide._count?.orders || 0;
        return Math.max(0, 1 - recentBookings * 0.1);
    }
    calculateAvailabilityScore(guide, date) {
        const availability = guide.availability;
        if (!availability || !availability[date]) {
            return 0;
        }
        return availability[date].available ? 1 : 0;
    }
    calculateSpecialtyScore(guide, serviceType) {
        if (!serviceType)
            return 0.5;
        const specialties = guide.specialties;
        if (!specialties)
            return 0.5;
        return specialties.includes(serviceType) ? 1 : 0.3;
    }
    isGuideAvailable(guide, date) {
        const availability = guide.availability;
        if (!availability || !availability[date]) {
            return true;
        }
        return availability[date].available !== false;
    }
    async markGuideBusy(guideId, date) {
        const dateStr = date.toISOString().split('T')[0];
        const guide = await this.prisma.guide.findUnique({
            where: { id: guideId },
            select: { availability: true },
        });
        if (!guide)
            return;
        const availability = guide.availability || {};
        availability[dateStr] = { available: false, booked: true };
        await this.prisma.guide.update({
            where: { id: guideId },
            data: { availability },
        });
    }
    async updateGuideStats(guideId) {
        const orderCount = await this.prisma.order.count({
            where: { guideId },
        });
        this.logger.log(`Guide ${guideId} has ${orderCount} total bookings`);
    }
};
exports.DispatchService = DispatchService;
exports.DispatchService = DispatchService = DispatchService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], DispatchService);
//# sourceMappingURL=dispatch.service.js.map