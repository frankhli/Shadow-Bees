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
exports.HotelsService = void 0;
const common_1 = require("@nestjs/common");
const mock_prisma_1 = require("../mock-prisma");
const HotelStatus = { ACTIVE: 'ACTIVE', PENDING: 'PENDING', INACTIVE: 'INACTIVE' };
let HotelsService = class HotelsService {
    constructor() {
        this.prisma = mock_prisma_1.mockPrisma;
    }
    async findAll(filters) {
        const { city, page } = filters;
        const perPage = 20;
        const hotels = await this.prisma.hotel.findMany();
        const total = await this.prisma.hotel.count();
        return {
            data: hotels,
            meta: {
                total,
                page,
                perPage,
                totalPages: Math.ceil(total / perPage),
            },
        };
    }
    async findOne(id) {
        return this.prisma.hotel.findUnique({ where: { id } });
    }
    async create(data) {
        return this.prisma.hotel.create({
            data: {
                ...data,
                status: 'PENDING',
            },
        });
    }
};
exports.HotelsService = HotelsService;
exports.HotelsService = HotelsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], HotelsService);
//# sourceMappingURL=hotels.service.js.map