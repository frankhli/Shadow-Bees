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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricingController = void 0;
const common_1 = require("@nestjs/common");
const pricing_service_1 = require("./pricing.service");
let PricingController = class PricingController {
    constructor(pricingService) {
        this.pricingService = pricingService;
    }
    async calculatePrice(hotelId, roomTypeId, date, guestNationality) {
        return this.pricingService.calculatePrice({
            hotelId,
            roomTypeId,
            date,
            guestNationality,
        });
    }
    async batchCalculate(data) {
        return this.pricingService.batchCalculate(data.hotelId, data.roomTypeId, data.startDate, data.endDate);
    }
    async getPricingFactors() {
        return this.pricingService.getPricingFactors();
    }
};
exports.PricingController = PricingController;
__decorate([
    (0, common_1.Get)('calculate'),
    __param(0, (0, common_1.Query)('hotelId')),
    __param(1, (0, common_1.Query)('roomTypeId')),
    __param(2, (0, common_1.Query)('date')),
    __param(3, (0, common_1.Query)('guestNationality')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "calculatePrice", null);
__decorate([
    (0, common_1.Post)('batch-calculate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "batchCalculate", null);
__decorate([
    (0, common_1.Get)('factors'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "getPricingFactors", null);
exports.PricingController = PricingController = __decorate([
    (0, common_1.Controller)('pricing'),
    __metadata("design:paramtypes", [pricing_service_1.PricingService])
], PricingController);
//# sourceMappingURL=pricing.controller.js.map