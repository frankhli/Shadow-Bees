"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PmsModule = void 0;
const common_1 = require("@nestjs/common");
const pms_controller_1 = require("./pms.controller");
const pms_service_1 = require("./pms.service");
const cloudbeds_service_1 = require("./cloudbeds.service");
const inventory_module_1 = require("../inventory/inventory.module");
let PmsModule = class PmsModule {
};
exports.PmsModule = PmsModule;
exports.PmsModule = PmsModule = __decorate([
    (0, common_1.Module)({
        imports: [inventory_module_1.InventoryModule],
        controllers: [pms_controller_1.PmsController],
        providers: [pms_service_1.PmsService, cloudbeds_service_1.CloudbedsService],
        exports: [pms_service_1.PmsService, cloudbeds_service_1.CloudbedsService],
    })
], PmsModule);
//# sourceMappingURL=pms.module.js.map