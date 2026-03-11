"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockDataService = void 0;
const common_1 = require("@nestjs/common");
const hostels_mock_1 = require("./hostels.mock");
const orders_mock_1 = require("./orders.mock");
const guides_mock_1 = require("./guides.mock");
const experiences_mock_1 = require("./experiences.mock");
const social_mock_1 = require("./social.mock");
const chat_mock_1 = require("./chat.mock");
let MockDataService = class MockDataService {
    async getHostels(filters) {
        const searchFilters = {
            query: filters.query,
            city: filters.city,
            experienceType: filters.experienceType,
            facilities: filters.facilities,
            minPrice: filters.minPrice,
            maxPrice: filters.maxPrice,
        };
        let data = (0, hostels_mock_1.searchHostelsAdvanced)(searchFilters);
        const page = filters.page || 1;
        const limit = filters.limit || 20;
        const start = (page - 1) * limit;
        const end = start + limit;
        return {
            data: data.slice(start, end),
            meta: {
                total: data.length,
                page,
                limit,
                totalPages: Math.ceil(data.length / limit),
            },
        };
    }
    async getHostelById(id) {
        return (0, hostels_mock_1.getHostelById)(id);
    }
    async getFeaturedHostels(limit = 8) {
        return (0, hostels_mock_1.getFeaturedHostels)(limit);
    }
    async getHostelsByExperienceType(type) {
        return (0, hostels_mock_1.getHostelsByExperienceType)(type);
    }
    async getFilterOptions() {
        return {
            experienceTypes: (0, hostels_mock_1.getAllExperienceTypes)(),
            facilityFilters: (0, hostels_mock_1.getFacilityFilters)(),
            cities: [...new Set(hostels_mock_1.hostelsData.map(h => h.city))],
            priceRange: {
                min: Math.min(...hostels_mock_1.hostelsData.map(h => h.pricePerNight)),
                max: Math.max(...hostels_mock_1.hostelsData.map(h => h.pricePerNight)),
            }
        };
    }
    async getOrders(filters) {
        let data = orders_mock_1.mockOrders;
        if (filters.userId) {
            data = (0, orders_mock_1.getOrdersByUser)(filters.userId);
        }
        if (filters.status && filters.status !== 'all') {
            data = data.filter(o => o.status === filters.status);
        }
        return data;
    }
    async getOrderById(id) {
        return (0, orders_mock_1.getOrderById)(id);
    }
    async getGuides(filters) {
        let data = guides_mock_1.mockGuides;
        if (filters.city && filters.city !== 'all') {
            data = (0, guides_mock_1.getGuidesByCity)(filters.city);
        }
        if (filters.language) {
            data = (0, guides_mock_1.getGuidesByLanguage)(filters.language);
        }
        return data;
    }
    async getGuideById(id) {
        return (0, guides_mock_1.getGuideById)(id);
    }
    async getExperiences(filters) {
        let data = experiences_mock_1.mockExperiences;
        if (filters.city && filters.city !== 'all') {
            data = (0, experiences_mock_1.getExperiencesByCity)(filters.city);
        }
        if (filters.type && filters.type !== 'all') {
            data = (0, experiences_mock_1.getExperiencesByType)(filters.type);
        }
        return data;
    }
    async getExperienceById(id) {
        return (0, experiences_mock_1.getExperienceById)(id);
    }
    async getEvents(filters) {
        return (0, social_mock_1.getEventsByCity)(filters.city);
    }
    async getEventById(id) {
        return (0, social_mock_1.getEventById)(id);
    }
    async getRoomShares(filters) {
        return (0, social_mock_1.getRoomSharesByCity)(filters.city);
    }
    async getRoomShareById(id) {
        return (0, social_mock_1.getRoomShareById)(id);
    }
    async getConversations(userId) {
        return (0, chat_mock_1.getConversationsByUser)(userId);
    }
    async getConversationById(id) {
        return (0, chat_mock_1.getConversationById)(id);
    }
    async getMessages(conversationId) {
        return (0, chat_mock_1.getMessagesByConversation)(conversationId);
    }
    async getCurrentUser() {
        return chat_mock_1.currentUser;
    }
};
exports.MockDataService = MockDataService;
exports.MockDataService = MockDataService = __decorate([
    (0, common_1.Injectable)()
], MockDataService);
//# sourceMappingURL=mock-data.service.js.map