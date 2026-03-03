import { Injectable, Logger, BadRequestException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaClient } from '@tiaohai/database'
import * as sharp from 'sharp'

// AWS SDK import (would need to install: npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner)
// For now, using a mock implementation

@Injectable()
export class UploadsService {
  private readonly logger = new Logger(UploadsService.name)
  private prisma: PrismaClient
  private s3Client: any
  private bucketName: string

  constructor(private configService: ConfigService) {
    this.prisma = new PrismaClient()
    this.bucketName = this.configService.get<string>('AWS_S3_BUCKET') || 'tiaohai-uploads'
    
    // Initialize S3 client (requires @aws-sdk/client-s3)
    // this.s3Client = new S3Client({
    //   region: this.configService.get('AWS_REGION'),
    //   credentials: {
    //     accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
    //     secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    //   },
    // })
  }

  /**
   * Upload a single image with optimization
   */
  async uploadImage(file: Express.Multer.File, folder?: string): Promise<{
    success: boolean
    url?: string
    key?: string
    error?: string
  }> {
    try {
      // Validate file
      this.validateImage(file)

      // Generate unique filename
      const timestamp = Date.now()
      const randomString = Math.random().toString(36).substring(2, 8)
      const extension = file.originalname.split('.').pop()
      const key = `${folder || 'general'}/${timestamp}-${randomString}.${extension}`

      // Optimize image
      const optimizedBuffer = await this.optimizeImage(file.buffer)

      // Upload to S3 (mock for now)
      // const command = new PutObjectCommand({
      //   Bucket: this.bucketName,
      //   Key: key,
      //   Body: optimizedBuffer,
      //   ContentType: file.mimetype,
      //   ACL: 'public-read',
      // })
      // await this.s3Client.send(command)

      // Mock URL
      const url = `https://${this.bucketName}.s3.amazonaws.com/${key}`

      this.logger.log(`Image uploaded: ${key}`)

      return {
        success: true,
        url,
        key,
      }
    } catch (error) {
      this.logger.error('Upload failed:', error)
      return {
        success: false,
        error: error.message,
      }
    }
  }

  /**
   * Upload multiple images
   */
  async uploadMultipleImages(
    files: Express.Multer.File[],
    folder?: string
  ): Promise<{
    success: boolean
    results: Array<{
      originalName: string
      url?: string
      key?: string
      error?: string
    }>
  }> {
    const results = await Promise.all(
      files.map(async (file) => {
        const result = await this.uploadImage(file, folder)
        return {
          originalName: file.originalname,
          url: result.url,
          key: result.key,
          error: result.error,
        }
      })
    )

    return {
      success: results.every((r) => !r.error),
      results,
    }
  }

  /**
   * Upload hotel license (with OCR processing trigger)
   */
  async uploadHotelLicense(
    file: Express.Multer.File,
    hotelId: string
  ): Promise<{
    success: boolean
    url?: string
    key?: string
    extractedData?: any
    error?: string
  }> {
    const result = await this.uploadImage(file, `hotels/${hotelId}/licenses`)

    if (!result.success) {
      return result
    }

    // Trigger OCR processing (mock)
    // In production, call AWS Textract or similar
    const extractedData = await this.processLicenseOCR(file)

    // Update hotel record
    await this.prisma.hotel.update({
      where: { id: hotelId },
      data: {
        licenseNo: extractedData.licenseNo,
        // Store license image URL
      },
    })

    return {
      success: true,
      url: result.url,
      key: result.key,
      extractedData,
    }
  }

  /**
   * Upload hotel photos
   */
  async uploadHotelPhotos(
    files: Express.Multer.File[],
    hotelId: string
  ): Promise<{
    success: boolean
    photos: Array<{
      url: string
      key: string
      type: 'exterior' | 'lobby' | 'room' | 'facility'
    }>
    error?: string
  }> {
    const folder = `hotels/${hotelId}/photos`
    const results = await this.uploadMultipleImages(files, folder)

    if (!results.success) {
      return {
        success: false,
        photos: [],
        error: 'Some uploads failed',
      }
    }

    const photos = results.results
      .filter((r) => r.url)
      .map((r) => ({
        url: r.url!,
        key: r.key!,
        type: this.detectPhotoType(r.originalName),
      }))

    // Update hotel record with photo URLs
    const hotel = await this.prisma.hotel.findUnique({
      where: { id: hotelId },
      select: { photos: true },
    })

    const existingPhotos = (hotel?.photos as any[]) || []
    await this.prisma.hotel.update({
      where: { id: hotelId },
      data: {
        photos: [...existingPhotos, ...photos],
      },
    })

    return {
      success: true,
      photos,
    }
  }

  /**
   * Upload guide avatar
   */
  async uploadGuideAvatar(
    file: Express.Multer.File,
    guideId: string
  ): Promise<{
    success: boolean
    url?: string
    error?: string
  }> {
    // Resize avatar to standard size
    const resizedBuffer = await this.resizeAvatar(file.buffer)
    
    // Create a modified file object
    const modifiedFile = {
      ...file,
      buffer: resizedBuffer,
    }

    return this.uploadImage(modifiedFile as Express.Multer.File, `guides/${guideId}`)
  }

  /**
   * Delete a file from S3
   */
  async deleteFile(key: string): Promise<{
    success: boolean
    error?: string
  }> {
    try {
      // const command = new DeleteObjectCommand({
      //   Bucket: this.bucketName,
      //   Key: key,
      // })
      // await this.s3Client.send(command)

      this.logger.log(`File deleted: ${key}`)

      return { success: true }
    } catch (error) {
      this.logger.error('Delete failed:', error)
      return {
        success: false,
        error: error.message,
      }
    }
  }

  /**
   * Generate presigned URL for direct upload
   */
  async getPresignedUrl(
    key: string,
    contentType: string,
    expiresIn: number = 300
  ): Promise<{
    uploadUrl: string
    publicUrl: string
  }> {
    // const command = new PutObjectCommand({
    //   Bucket: this.bucketName,
    //   Key: key,
    //   ContentType: contentType,
    // })
    // const uploadUrl = await getSignedUrl(this.s3Client, command, { expiresIn })

    const uploadUrl = `https://${this.bucketName}.s3.amazonaws.com/${key}?presigned=true`
    const publicUrl = `https://${this.bucketName}.s3.amazonaws.com/${key}`

    return { uploadUrl, publicUrl }
  }

  // Private helper methods

  private validateImage(file: Express.Multer.File): void {
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        'Invalid file type. Only JPEG, PNG, and WebP are allowed.'
      )
    }

    // Check file size (10MB max)
    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      throw new BadRequestException('File too large. Maximum size is 10MB.')
    }
  }

  private async optimizeImage(buffer: Buffer): Promise<Buffer> {
    try {
      return await sharp(buffer)
        .resize(2048, 2048, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 85, progressive: true })
        .toBuffer()
    } catch (error) {
      this.logger.warn('Image optimization failed, returning original:', error)
      return buffer
    }
  }

  private async resizeAvatar(buffer: Buffer): Promise<Buffer> {
    try {
      return await sharp(buffer)
        .resize(400, 400, { fit: 'cover' })
        .jpeg({ quality: 90 })
        .toBuffer()
    } catch (error) {
      return buffer
    }
  }

  private async processLicenseOCR(file: Express.Multer.File): Promise<any> {
    // Mock OCR processing
    // In production, use AWS Textract or Google Vision API
    this.logger.log('Processing OCR for license...')
    
    return {
      licenseNo: '京特旅字第20240001号',
      hotelName: 'Sample Hotel',
      address: 'Beijing',
      expiryDate: '2025-12-31',
      confidence: 0.95,
    }
  }

  private detectPhotoType(filename: string): 'exterior' | 'lobby' | 'room' | 'facility' {
    const lower = filename.toLowerCase()
    if (lower.includes('exterior') || lower.includes('outside')) return 'exterior'
    if (lower.includes('lobby') || lower.includes('reception')) return 'lobby'
    if (lower.includes('room') || lower.includes('bed')) return 'room'
    return 'facility'
  }
}
