"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const hotels_module_1 = require("./hotels/hotels.module");
const guides_module_1 = require("./guides/guides.module");
const experiences_module_1 = require("./experiences/experiences.module");
const orders_module_1 = require("./orders/orders.module");
const payments_module_1 = require("./payments/payments.module");
const inventory_module_1 = require("./inventory/inventory.module");
const webhooks_module_1 = require("./webhooks/webhooks.module");
const ai_module_1 = require("./ai/ai.module");
const health_module_1 = require("./health/health.module");
const social_module_1 = require("./social/social.module");
const chat_module_1 = require("./chat/chat.module");
const reviews_module_1 = require("./reviews/reviews.module");
const mock_data_module_1 = require("./mock-data/mock-data.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            auth_module_1.AuthModule,
            hotels_module_1.HotelsModule,
            guides_module_1.GuidesModule,
            experiences_module_1.ExperiencesModule,
            orders_module_1.OrdersModule,
            payments_module_1.PaymentsModule,
            inventory_module_1.InventoryModule,
            webhooks_module_1.WebhooksModule,
            ai_module_1.AIModule,
            health_module_1.HealthModule,
            social_module_1.SocialModule,
            chat_module_1.ChatModule,
            reviews_module_1.ReviewsModule,
            mock_data_module_1.MockDataModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map