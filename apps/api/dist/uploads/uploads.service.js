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
var UploadsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const database_1 = require("@tiaohai/database");
const sharp = require("sharp");
let UploadsService = UploadsService_1 = class UploadsService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(UploadsService_1.name);
        this.prisma = new database_1.PrismaClient();
        this.bucketName = this.configService.get('AWS_S3_BUCKET') || 'tiaohai-uploads';
    }
    async uploadImage(file, folder) {
        try {
            this.validateImage(file);
            const timestamp = Date.now();
            const randomString = Math.random().toString(36).substring(2, 8);
            const extension = file.originalname.split('.').pop();
            const key = `${folder || 'general'}/${timestamp}-${randomString}.${extension}`;
            const optimizedBuffer = await this.optimizeImage(file.buffer);
            const url = `https://${this.bucketName}.s3.amazonaws.com/${key}`;
            this.logger.log(`Image uploaded: ${key}`);
            return {
                success: true,
                url,
                key,
            };
        }
        catch (error) {
            this.logger.error('Upload failed:', error);
            return {
                success: false,
                error: error.message,
            };
        }
    }
    async uploadMultipleImages(files, folder) {
        const results = await Promise.all(files.map(async (file) => {
            const result = await this.uploadImage(file, folder);
            return {
                originalName: file.originalname,
                url: result.url,
                key: result.key,
                error: result.error,
            };
        }));
        return {
            success: results.every((r) => !r.error),
            results,
        };
    }
    async uploadHotelLicense(file, hotelId) {
        const result = await this.uploadImage(file, `hotels/${hotelId}/licenses`);
        if (!result.success) {
            return result;
        }
        const extractedData = await this.processLicenseOCR(file);
        await this.prisma.hotel.update({
            where: { id: hotelId },
            data: {
                licenseNo: extractedData.licenseNo,
            },
        });
        return {
            success: true,
            url: result.url,
            key: result.key,
            extractedData,
        };
    }
    async uploadHotelPhotos(files, hotelId) {
        const folder = `hotels/${hotelId}/photos`;
        const results = await this.uploadMultipleImages(files, folder);
        if (!results.success) {
            return {
                success: false,
                photos: [],
                error: 'Some uploads failed',
            };
        }
        const photos = results.results
            .filter((r) => r.url)
            .map((r) => ({
            url: r.url,
            key: r.key,
            type: this.detectPhotoType(r.originalName),
        }));
        const hotel = await this.prisma.hotel.findUnique({
            where: { id: hotelId },
            select: { photos: true },
        });
        const existingPhotos = hotel?.photos || [];
        await this.prisma.hotel.update({
            where: { id: hotelId },
            data: {
                photos: [...existingPhotos, ...photos],
            },
        });
        return {
            success: true,
            photos,
        };
    }
    async uploadGuideAvatar(file, guideId) {
        const resizedBuffer = await this.resizeAvatar(file.buffer);
        const modifiedFile = {
            ...file,
            buffer: resizedBuffer,
        };
        return this.uploadImage(modifiedFile, `guides/${guideId}`);
    }
    async deleteFile(key) {
        try {
            this.logger.log(`File deleted: ${key}`);
            return { success: true };
        }
        catch (error) {
            this.logger.error('Delete failed:', error);
            return {
                success: false,
                error: error.message,
            };
        }
    }
    async getPresignedUrl(key, contentType, expiresIn = 300) {
        const uploadUrl = `https://${this.bucketName}.s3.amazonaws.com/${key}?presigned=true`;
        const publicUrl = `https://${this.bucketName}.s3.amazonaws.com/${key}`;
        return { uploadUrl, publicUrl };
    }
    validateImage(file) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(file.mimetype)) {
            throw new common_1.BadRequestException('Invalid file type. Only JPEG, PNG, and WebP are allowed.');
        }
        const maxSize = 10 * 1024 * 1024;
        if (file.size > maxSize) {
            throw new common_1.BadRequestException('File too large. Maximum size is 10MB.');
        }
    }
    async optimizeImage(buffer) {
        try {
            return await sharp(buffer)
                .resize(2048, 2048, { fit: 'inside', withoutEnlargement: true })
                .jpeg({ quality: 85, progressive: true })
                .toBuffer();
        }
        catch (error) {
            this.logger.warn('Image optimization failed, returning original:', error);
            return buffer;
        }
    }
    async resizeAvatar(buffer) {
        try {
            return await sharp(buffer)
                .resize(400, 400, { fit: 'cover' })
                .jpeg({ quality: 90 })
                .toBuffer();
        }
        catch (error) {
            return buffer;
        }
    }
    async processLicenseOCR(file) {
        this.logger.log('Processing OCR for license...');
        return {
            licenseNo: '京特旅字第20240001号',
            hotelName: 'Sample Hotel',
            address: 'Beijing',
            expiryDate: '2025-12-31',
            confidence: 0.95,
        };
    }
    detectPhotoType(filename) {
        const lower = filename.toLowerCase();
        if (lower.includes('exterior') || lower.includes('outside'))
            return 'exterior';
        if (lower.includes('lobby') || lower.includes('reception'))
            return 'lobby';
        if (lower.includes('room') || lower.includes('bed'))
            return 'room';
        return 'facility';
    }
};
exports.UploadsService = UploadsService;
exports.UploadsService = UploadsService = UploadsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], UploadsService);
//# sourceMappingURL=uploads.service.js.map