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
exports.GenerateContentResponse = exports.GenerateContentDto = exports.Platform = void 0;
const class_validator_1 = require("class-validator");
var Platform;
(function (Platform) {
    Platform["TIKTOK"] = "tiktok";
    Platform["XIAOHONGSHU"] = "xiaohongshu";
    Platform["INSTAGRAM"] = "instagram";
    Platform["BOOKING"] = "booking";
})(Platform || (exports.Platform = Platform = {}));
class GenerateContentDto {
    constructor() {
        this.style = 'lifestyle';
        this.language = 'en';
    }
}
exports.GenerateContentDto = GenerateContentDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GenerateContentDto.prototype, "hotel_name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GenerateContentDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], GenerateContentDto.prototype, "facilities", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Platform),
    __metadata("design:type", String)
], GenerateContentDto.prototype, "platform", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GenerateContentDto.prototype, "style", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GenerateContentDto.prototype, "language", void 0);
class GenerateContentResponse {
}
exports.GenerateContentResponse = GenerateContentResponse;
//# sourceMappingURL=generate-content.dto.js.map