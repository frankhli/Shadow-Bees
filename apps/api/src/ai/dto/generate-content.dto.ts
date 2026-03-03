import { IsString, IsOptional, IsObject, IsEnum } from 'class-validator';

export enum Platform {
  TIKTOK = 'tiktok',
  XIAOHONGSHU = 'xiaohongshu',
  INSTAGRAM = 'instagram',
  BOOKING = 'booking',
}

export class GenerateContentDto {
  @IsString()
  hotel_name: string;

  @IsString()
  city: string;

  @IsObject()
  @IsOptional()
  facilities?: Record<string, boolean>;

  @IsEnum(Platform)
  platform: Platform;

  @IsString()
  @IsOptional()
  style?: string = 'lifestyle';

  @IsString()
  @IsOptional()
  language?: string = 'en';
}

export class GenerateContentResponse {
  platform: string;
  language: string;
  content: string;
  hashtags: string[];
  suggestions?: string[];
}
