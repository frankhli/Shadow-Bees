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
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const database_1 = require("@tiaohai/database");
let ReviewsService = class ReviewsService {
    constructor() {
        this.prisma = new database_1.PrismaClient();
    }
    async getGuideReviews(guideId, options) {
        const reviews = await this.prisma.guideReview.findMany({
            where: {
                guideId,
                isPublished: true
            },
            include: {
                order: {
                    select: {
                        guest: {
                            select: {
                                name: true,
                                nationality: true
                            }
                        },
                        serviceDate: true,
                        serviceHours: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' },
            take: options.limit
        });
        return reviews.map(review => ({
            id: review.id,
            rating: review.rating,
            communication: review.communication,
            knowledge: review.knowledge,
            punctuality: review.punctuality,
            title: review.title,
            content: review.content,
            isVerified: review.isVerified,
            guideResponse: review.guideResponse,
            respondedAt: review.respondedAt,
            createdAt: review.createdAt,
            reviewer: review.order?.guest,
            serviceInfo: review.order ? {
                date: review.order.serviceDate,
                hours: review.order.serviceHours
            } : null
        }));
    }
    async getGuideReviewStats(guideId) {
        const reviews = await this.prisma.guideReview.findMany({
            where: {
                guideId,
                isPublished: true
            },
            select: {
                rating: true,
                communication: true,
                knowledge: true,
                punctuality: true
            }
        });
        if (reviews.length === 0) {
            return {
                totalReviews: 0,
                averageRating: 0,
                averageCommunication: 0,
                averageKnowledge: 0,
                averagePunctuality: 0,
                ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
            };
        }
        const totalReviews = reviews.length;
        const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews;
        const communicationReviews = reviews.filter(r => r.communication !== null);
        const averageCommunication = communicationReviews.length > 0
            ? communicationReviews.reduce((sum, r) => sum + (r.communication || 0), 0) / communicationReviews.length
            : 0;
        const knowledgeReviews = reviews.filter(r => r.knowledge !== null);
        const averageKnowledge = knowledgeReviews.length > 0
            ? knowledgeReviews.reduce((sum, r) => sum + (r.knowledge || 0), 0) / knowledgeReviews.length
            : 0;
        const punctualityReviews = reviews.filter(r => r.punctuality !== null);
        const averagePunctuality = punctualityReviews.length > 0
            ? punctualityReviews.reduce((sum, r) => sum + (r.punctuality || 0), 0) / punctualityReviews.length
            : 0;
        const ratingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        reviews.forEach(r => {
            ratingDistribution[r.rating]++;
        });
        await this.prisma.guide.update({
            where: { id: guideId },
            data: { rating: averageRating }
        });
        return {
            totalReviews,
            averageRating: Math.round(averageRating * 10) / 10,
            averageCommunication: Math.round(averageCommunication * 10) / 10,
            averageKnowledge: Math.round(averageKnowledge * 10) / 10,
            averagePunctuality: Math.round(averagePunctuality * 10) / 10,
            ratingDistribution
        };
    }
    async createReview(data) {
        const order = await this.prisma.order.findUnique({
            where: { id: data.orderId }
        });
        if (!order || order.guideId !== data.guideId) {
            throw new Error('Invalid order');
        }
        const existingReview = await this.prisma.guideReview.findUnique({
            where: { orderId: data.orderId }
        });
        if (existingReview) {
            throw new Error('Review already exists for this order');
        }
        const review = await this.prisma.guideReview.create({
            data: {
                guideId: data.guideId,
                orderId: data.orderId,
                reviewerId: data.reviewerId,
                rating: data.rating,
                communication: data.communication,
                knowledge: data.knowledge,
                punctuality: data.punctuality,
                title: data.title,
                content: data.content,
                isVerified: order.status === 'COMPLETED'
            }
        });
        await this.getGuideReviewStats(data.guideId);
        return review;
    }
    async respondToReview(reviewId, guideId, response) {
        const review = await this.prisma.guideReview.findUnique({
            where: { id: reviewId }
        });
        if (!review || review.guideId !== guideId) {
            throw new Error('Review not found or unauthorized');
        }
        return this.prisma.guideReview.update({
            where: { id: reviewId },
            data: {
                guideResponse: response,
                respondedAt: new Date()
            }
        });
    }
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map