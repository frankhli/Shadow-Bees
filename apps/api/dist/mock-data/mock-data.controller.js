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
exports.MockDataController = void 0;
const common_1 = require("@nestjs/common");
const mock_data_service_1 = require("./mock-data.service");
let MockDataController = class MockDataController {
    constructor(mockDataService) {
        this.mockDataService = mockDataService;
    }
    async getHostels(city, query, page, limit) {
        return this.mockDataService.getHostels({
            city,
            query,
            page: page ? parseInt(page) : 1,
            limit: limit ? parseInt(limit) : 20,
        });
    }
    async getFeaturedHostels(limit) {
        return this.mockDataService.getFeaturedHostels(limit ? parseInt(limit) : 8);
    }
    async getHostelById(id) {
        return this.mockDataService.getHostelById(id);
    }
    async getOrders(userId, status) {
        return this.mockDataService.getOrders({ userId, status });
    }
    async getOrderById(id) {
        return this.mockDataService.getOrderById(id);
    }
    async getGuides(city, language) {
        return this.mockDataService.getGuides({ city, language });
    }
    async getGuideById(id) {
        return this.mockDataService.getGuideById(id);
    }
    async getExperiences(city, type) {
        return this.mockDataService.getExperiences({ city, type });
    }
    async getExperienceById(id) {
        return this.mockDataService.getExperienceById(id);
    }
    async getEvents(city) {
        return this.mockDataService.getEvents({ city });
    }
    async getEventById(id) {
        return this.mockDataService.getEventById(id);
    }
    async joinEvent(id, body) {
        return { success: true, eventId: id, userId: body.userId };
    }
    async getRoomShares(city) {
        return this.mockDataService.getRoomShares({ city });
    }
    async getRoomShareById(id) {
        return this.mockDataService.getRoomShareById(id);
    }
    async respondToRoomShare(id, body) {
        return { success: true, roomShareId: id, userId: body.userId };
    }
    async getConversations(userId) {
        return this.mockDataService.getConversations(userId || 'user-001');
    }
    async getConversationById(id) {
        return this.mockDataService.getConversationById(id);
    }
    async getMessages(conversationId) {
        return this.mockDataService.getMessages(conversationId);
    }
    async markAsRead(id, body) {
        return { success: true };
    }
    async sendMessage(body) {
        return {
            id: `msg-${Date.now()}`,
            conversationId: body.conversationId,
            senderId: body.senderId,
            content: body.content,
            contentType: body.contentType || 'text',
            createdAt: new Date().toISOString(),
            isDeleted: false,
        };
    }
    async getCurrentUser() {
        return this.mockDataService.getCurrentUser();
    }
};
exports.MockDataController = MockDataController;
__decorate([
    (0, common_1.Get)('hostels'),
    __param(0, (0, common_1.Query)('city')),
    __param(1, (0, common_1.Query)('q')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], MockDataController.prototype, "getHostels", null);
__decorate([
    (0, common_1.Get)('hostels/featured'),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MockDataController.prototype, "getFeaturedHostels", null);
__decorate([
    (0, common_1.Get)('hostels/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MockDataController.prototype, "getHostelById", null);
__decorate([
    (0, common_1.Get)('orders'),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MockDataController.prototype, "getOrders", null);
__decorate([
    (0, common_1.Get)('orders/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MockDataController.prototype, "getOrderById", null);
__decorate([
    (0, common_1.Get)('guides'),
    __param(0, (0, common_1.Query)('city')),
    __param(1, (0, common_1.Query)('language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MockDataController.prototype, "getGuides", null);
__decorate([
    (0, common_1.Get)('guides/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MockDataController.prototype, "getGuideById", null);
__decorate([
    (0, common_1.Get)('experiences'),
    __param(0, (0, common_1.Query)('city')),
    __param(1, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MockDataController.prototype, "getExperiences", null);
__decorate([
    (0, common_1.Get)('experiences/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MockDataController.prototype, "getExperienceById", null);
__decorate([
    (0, common_1.Get)('events'),
    __param(0, (0, common_1.Query)('city')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MockDataController.prototype, "getEvents", null);
__decorate([
    (0, common_1.Get)('events/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MockDataController.prototype, "getEventById", null);
__decorate([
    (0, common_1.Post)('events/:id/join'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MockDataController.prototype, "joinEvent", null);
__decorate([
    (0, common_1.Get)('room-shares'),
    __param(0, (0, common_1.Query)('city')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MockDataController.prototype, "getRoomShares", null);
__decorate([
    (0, common_1.Get)('room-shares/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MockDataController.prototype, "getRoomShareById", null);
__decorate([
    (0, common_1.Post)('room-shares/:id/respond'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MockDataController.prototype, "respondToRoomShare", null);
__decorate([
    (0, common_1.Get)('chat/conversations'),
    __param(0, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MockDataController.prototype, "getConversations", null);
__decorate([
    (0, common_1.Get)('chat/conversations/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MockDataController.prototype, "getConversationById", null);
__decorate([
    (0, common_1.Get)('chat/conversations/:id/messages'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MockDataController.prototype, "getMessages", null);
__decorate([
    (0, common_1.Post)('chat/conversations/:id/read'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MockDataController.prototype, "markAsRead", null);
__decorate([
    (0, common_1.Post)('chat/messages'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MockDataController.prototype, "sendMessage", null);
__decorate([
    (0, common_1.Get)('me'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MockDataController.prototype, "getCurrentUser", null);
exports.MockDataController = MockDataController = __decorate([
    (0, common_1.Controller)('mock'),
    __metadata("design:paramtypes", [mock_data_service_1.MockDataService])
], MockDataController);
//# sourceMappingURL=mock-data.controller.js.map