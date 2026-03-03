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
exports.ExperiencesService = void 0;
const common_1 = require("@nestjs/common");
const database_1 = require("@tiaohai/database");
let ExperiencesService = class ExperiencesService {
    constructor() {
        this.prisma = new database_1.PrismaClient();
    }
    async findAll(filters) {
        const where = {
            isActive: true,
        };
        if (filters.city) {
            where.city = filters.city;
        }
        if (filters.type) {
            where.type = filters.type;
        }
        return this.prisma.experience.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        return this.prisma.experience.findUnique({
            where: { id },
        });
    }
    async create(data) {
        return this.prisma.experience.create({
            data: {
                name: data.name,
                nameEn: data.nameEn,
                type: data.type,
                city: data.city,
                address: data.address,
                lat: data.lat,
                lng: data.lng,
                description: data.description,
                descriptionEn: data.descriptionEn,
                pricePerPerson: data.pricePerPerson,
                durationMinutes: data.durationMinutes,
                maxCapacity: data.maxCapacity,
                photos: data.photos || [],
                partnerContract: data.partnerContract,
                isActive: true,
            },
        });
    }
};
exports.ExperiencesService = ExperiencesService;
exports.ExperiencesService = ExperiencesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ExperiencesService);
//# sourceMappingURL=experiences.service.js.map