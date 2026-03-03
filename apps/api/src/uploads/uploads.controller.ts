import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Body,
  UseGuards,
} from '@nestjs/common'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { UploadsService } from './uploads.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body('folder') folder?: string
  ) {
    return this.uploadsService.uploadImage(file, folder)
  }

  @Post('images')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('images', 10))
  async uploadMultipleImages(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('folder') folder?: string
  ) {
    return this.uploadsService.uploadMultipleImages(files, folder)
  }

  @Post('hotel-license')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('license'))
  async uploadHotelLicense(
    @UploadedFile() file: Express.Multer.File,
    @Body('hotelId') hotelId: string
  ) {
    return this.uploadsService.uploadHotelLicense(file, hotelId)
  }

  @Post('hotel-photos')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('photos', 20))
  async uploadHotelPhotos(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('hotelId') hotelId: string
  ) {
    return this.uploadsService.uploadHotelPhotos(files, hotelId)
  }

  @Post('guide-avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadGuideAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Body('guideId') guideId: string
  ) {
    return this.uploadsService.uploadGuideAvatar(file, guideId)
  }

  @Post('delete')
  @UseGuards(JwtAuthGuard)
  async deleteFile(@Body('key') key: string) {
    return this.uploadsService.deleteFile(key)
  }
}
