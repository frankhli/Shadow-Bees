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
exports.SocialController = void 0;
const common_1 = require("@nestjs/common");
const social_service_1 = require("./social.service");
const create_event_dto_1 = require("./dto/create-event.dto");
const create_room_share_dto_1 = require("./dto/create-room-share.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let SocialController = class SocialController {
    constructor(socialService) {
        this.socialService = socialService;
    }
    async findEvents(city, type, date) {
        return this.socialService.findEvents({ city, type, date });
    }
    async findEventById(id) {
        return this.socialService.findEventById(id);
    }
    async createEvent(createEventDto) {
        return this.socialService.createEvent(createEventDto);
    }
    async joinEvent(eventId, userId, notes) {
        return this.socialService.joinEvent(eventId, userId, notes);
    }
    async leaveEvent(eventId, userId) {
        return this.socialService.leaveEvent(eventId, userId);
    }
    async findRoomShares(city, checkIn) {
        return this.socialService.findRoomShares({ city, checkIn });
    }
    async findRoomShareById(id) {
        return this.socialService.findRoomShareById(id);
    }
    async createRoomShare(createRoomShareDto) {
        return this.socialService.createRoomShare(createRoomShareDto);
    }
    async respondToRoomShare(roomShareId, userId, message) {
        return this.socialService.respondToRoomShare(roomShareId, userId, message);
    }
};
exports.SocialController = SocialController;
__decorate([
    (0, common_1.Get)('events'),
    __param(0, (0, common_1.Query)('city')),
    __param(1, (0, common_1.Query)('type')),
    __param(2, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], SocialController.prototype, "findEvents", null);
__decorate([
    (0, common_1.Get)('events/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SocialController.prototype, "findEventById", null);
__decorate([
    (0, common_1.Post)('events'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_event_dto_1.CreateEventDto]),
    __metadata("design:returntype", Promise)
], SocialController.prototype, "createEvent", null);
__decorate([
    (0, common_1.Post)('events/:id/join'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('userId')),
    __param(2, (0, common_1.Body)('notes')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], SocialController.prototype, "joinEvent", null);
__decorate([
    (0, common_1.Post)('events/:id/leave'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SocialController.prototype, "leaveEvent", null);
__decorate([
    (0, common_1.Get)('room-shares'),
    __param(0, (0, common_1.Query)('city')),
    __param(1, (0, common_1.Query)('checkIn')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SocialController.prototype, "findRoomShares", null);
__decorate([
    (0, common_1.Get)('room-shares/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SocialController.prototype, "findRoomShareById", null);
__decorate([
    (0, common_1.Post)('room-shares'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_room_share_dto_1.CreateRoomShareDto]),
    __metadata("design:returntype", Promise)
], SocialController.prototype, "createRoomShare", null);
__decorate([
    (0, common_1.Post)('room-shares/:id/respond'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('userId')),
    __param(2, (0, common_1.Body)('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], SocialController.prototype, "respondToRoomShare", null);
exports.SocialController = SocialController = __decorate([
    (0, common_1.Controller)('social'),
    __metadata("design:paramtypes", [social_service_1.SocialService])
], SocialController);
//# sourceMappingURL=social.controller.js.map