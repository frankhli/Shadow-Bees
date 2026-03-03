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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const database_1 = require("@tiaohai/database");
let OrdersService = class OrdersService {
    constructor() {
        this.prisma = new database_1.PrismaClient();
    }
    async findAll(filters) {
        const where = {};
        if (filters.hotelId)
            where.hotelId = filters.hotelId;
        if (filters.guestId)
            where.guestId = filters.guestId;
        if (filters.guideId)
            where.guideId = filters.guideId;
        if (filters.status)
            where.status = filters.status;
        return this.prisma.order.findMany({
            where,
            include: {
                hotel: {
                    select: { name: true, city: true },
                },
                roomType: {
                    select: { name: true, nameEn: true },
                },
                guide: {
                    select: { name: true, nameEn: true },
                },
                guest: {
                    select: { name: true, nationality: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        return this.prisma.order.findUnique({
            where: { id },
            include: {
                hotel: true,
                roomType: true,
                guide: true,
                experience: true,
                guest: {
                    select: { name: true, nationality: true },
                },
            },
        });
    }
    async create(data) {
        const orderNo = this.generateOrderNo();
        let totalAmount = 0;
        let platformFee = 0;
        if (data.roomPriceTotal) {
            totalAmount += data.roomPriceTotal;
            platformFee += data.roomPriceTotal * 0.15;
        }
        if (data.guideFee) {
            totalAmount += data.guideFee;
            platformFee += data.guideFee * 0.25;
        }
        if (data.experienceFee) {
            totalAmount += data.experienceFee;
            platformFee += data.experienceFee * 0.20;
        }
        return this.prisma.order.create({
            data: {
                orderNo,
                guestId: data.guestId,
                guestNationality: data.guestNationality,
                orderType: data.orderType || database_1.OrderType.ACCOMMODATION_ONLY,
                hotelId: data.hotelId,
                roomTypeId: data.roomTypeId,
                checkIn: data.checkIn ? new Date(data.checkIn) : null,
                checkOut: data.checkOut ? new Date(data.checkOut) : null,
                nights: data.nights,
                roomPriceTotal: data.roomPriceTotal,
                guideId: data.guideId,
                serviceDate: data.serviceDate ? new Date(data.serviceDate) : null,
                serviceHours: data.serviceHours,
                guideFee: data.guideFee,
                experienceId: data.experienceId,
                experienceFee: data.experienceFee,
                totalAmount,
                currency: data.currency || 'USD',
                exchangeRate: data.exchangeRate,
                platformFee,
                paymentStatus: database_1.PaymentStatus.PENDING,
                status: database_1.OrderStatus.CONFIRMED,
            },
        });
    }
    async cancel(id, reason) {
        return this.prisma.order.update({
            where: { id },
            data: {
                status: database_1.OrderStatus.CANCELLED,
                cancelledAt: new Date(),
                cancelledReason: reason,
            },
        });
    }
    async confirm(id) {
        return this.prisma.order.update({
            where: { id },
            data: {
                status: database_1.OrderStatus.CONFIRMED,
            },
        });
    }
    async complete(id) {
        return this.prisma.order.update({
            where: { id },
            data: {
                status: database_1.OrderStatus.COMPLETED,
                completedAt: new Date(),
            },
        });
    }
    generateOrderNo() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const random = Math.floor(1000 + Math.random() * 9000);
        return `TH${year}${month}${day}${random}`;
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], OrdersService);
//# sourceMappingURL=orders.service.js.map