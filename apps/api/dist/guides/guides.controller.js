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
exports.GuidesController = void 0;
const common_1 = require("@nestjs/common");
const guides_service_1 = require("./guides.service");
const create_guide_dto_1 = require("./dto/create-guide.dto");
const update_availability_dto_1 = require("./dto/update-availability.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let GuidesController = class GuidesController {
    constructor(guidesService) {
        this.guidesService = guidesService;
    }
    async findAll(city, language, date) {
        return this.guidesService.findAll({ city, language, date });
    }
    async findOne(id) {
        return this.guidesService.findOne(id);
    }
    async getAvailability(id, month) {
        return this.guidesService.getAvailability(id, month);
    }
    async create(createGuideDto) {
        return this.guidesService.create(createGuideDto);
    }
    async updateAvailability(id, updateAvailabilityDto) {
        return this.guidesService.updateAvailability(id, updateAvailabilityDto);
    }
};
exports.GuidesController = GuidesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('city')),
    __param(1, (0, common_1.Query)('language')),
    __param(2, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], GuidesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GuidesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/availability'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('month')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GuidesController.prototype, "getAvailability", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_guide_dto_1.CreateGuideDto]),
    __metadata("design:returntype", Promise)
], GuidesController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/availability'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_availability_dto_1.UpdateAvailabilityDto]),
    __metadata("design:returntype", Promise)
], GuidesController.prototype, "updateAvailability", null);
exports.GuidesController = GuidesController = __decorate([
    (0, common_1.Controller)('guides'),
    __metadata("design:paramtypes", [guides_service_1.GuidesService])
], GuidesController);
//# sourceMappingURL=guides.controller.js.map