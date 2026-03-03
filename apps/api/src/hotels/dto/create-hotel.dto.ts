import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator'

export class CreateHotelDto {
  @IsString()
  name: string

  @IsString()
  @IsOptional()
  nameEn?: string

  @IsString()
  city: string

  @IsString()
  address: string

  @IsString()
  licenseNo: string

  @IsBoolean()
  @IsOptional()
  hasForeignGuestLicense?: boolean = true

  @IsNumber()
  @IsOptional()
  lat?: number

  @IsNumber()
  @IsOptional()
  lng?: number

  @IsOptional()
  facilities?: Record<string, any>

  @IsNumber()
  @IsOptional()
  basePrice?: number
}
