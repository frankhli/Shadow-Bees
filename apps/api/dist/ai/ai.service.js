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
var AIService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let AIService = AIService_1 = class AIService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(AIService_1.name);
        this.aiServiceUrl = this.configService.get('AI_SERVICE_URL') || 'http://localhost:5000';
    }
    async generateContent(request) {
        try {
            this.logger.log(`Generating content for ${request.platform} in ${request.language}`);
            const response = await fetch(`${this.aiServiceUrl}/ai/generate/content`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            });
            if (!response.ok) {
                throw new Error(`AI service error: ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            this.logger.error('Failed to generate content', error.message);
            throw error;
        }
    }
    async getTemplates() {
        try {
            const response = await fetch(`${this.aiServiceUrl}/ai/templates`);
            if (!response.ok) {
                throw new Error(`AI service error: ${response.statusText}`);
            }
            return await response.json();
        }
        catch (error) {
            this.logger.error('Failed to get templates', error.message);
            throw error;
        }
    }
};
exports.AIService = AIService;
exports.AIService = AIService = AIService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AIService);
//# sourceMappingURL=ai.service.js.map