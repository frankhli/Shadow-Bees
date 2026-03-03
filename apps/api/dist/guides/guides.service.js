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
exports.GuidesService = void 0;
const common_1 = require("@nestjs/common");
const database_1 = require("@tiaohai/database");
let GuidesService = class GuidesService {
    constructor() {
        this.prisma = new database_1.PrismaClient();
    }
    async findAll(filters) {
        const where = {
            status: database_1.GuideStatus.ACTIVE,
            licenseVerified: true,
        };
        if (filters.city) {
            where.city = filters.city;
        }
        if (filters.language) {
            where.languages = { has: filters.language };
        }
        const guides = await this.prisma.guide.findMany({
            where,
            include: {
                user: {
                    select: { email: true },
                },
            },
            orderBy: { rating: 'desc' },
        });
        if (filters.date) {
            return guides.filter((guide) => this.isAvailable(guide, filters.date));
        }
        return guides;
    }
    async findOne(id) {
        return this.prisma.guide.findUnique({
            where: { id },
            include: {
                user: {
                    select: { email: true },
                },
            },
        });
    }
    async create(data) {
        const user = await this.prisma.user.create({
            data: {
                email: data.email,
                password: data.password,
                role: 'GUIDE',
            },
        });
        return this.prisma.guide.create({
            data: {
                userId: user.id,
                name: data.name,
                nameEn: data.nameEn,
                languages: data.languages,
                specialties: data.specialties,
                licenseNo: data.licenseNo,
                city: data.city,
                bio: data.bio,
                bioEn: data.bioEn,
                hourlyRate: data.hourlyRate,
                availability: {},
                status: database_1.GuideStatus.ACTIVE,
            },
        });
    }
    async getAvailability(guideId, month) {
        const guide = await this.prisma.guide.findUnique({
            where: { id: guideId },
            select: { availability: true },
        });
        if (!guide) {
            throw new Error('Guide not found');
        }
        const availability = guide.availability;
        const monthPrefix = month.substring(0, 7);
        return Object.entries(availability || {})
            .filter(([date]) => date.startsWith(monthPrefix))
            .map(([date, slots]) => ({ date, slots }));
    }
    async updateAvailability(guideId, data) {
        const guide = await this.prisma.guide.findUnique({
            where: { id: guideId },
            select: { availability: true },
        });
        if (!guide) {
            throw new Error('Guide not found');
        }
        const currentAvailability = guide.availability || {};
        const newAvailability = { ...currentAvailability };
        for (const [date, slots] of Object.entries(data.availability)) {
            newAvailability[date] = slots;
        }
        return this.prisma.guide.update({
            where: { id: guideId },
            data: {
                availability: newAvailability,
            },
        });
    }
    isAvailable(guide, date) {
        const availability = guide.availability;
        if (!availability || !availability[date]) {
            return false;
        }
        return availability[date].available === true;
    }
};
exports.GuidesService = GuidesService;
exports.GuidesService = GuidesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], GuidesService);
//# sourceMappingURL=guides.service.js.map