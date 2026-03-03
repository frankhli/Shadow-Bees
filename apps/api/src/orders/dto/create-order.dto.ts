import { IsString, IsOptional, IsNumber, IsEnum, IsDateString } from 'class-validator'
import { OrderType } from '@tiaohai/database'

export class CreateOrderDto {
  @IsString()
  guestId: string

  @IsString()
  @IsOptional()
  guestNationality?: string

  @IsEnum(OrderType)
  @IsOptional()
  orderType?: OrderType

  // Accommodation
  @IsString()
  @IsOptional()
  hotelId?: string

  @IsString()
  @IsOptional()
  roomTypeId?: string

  @IsDateString()
  @IsOptional()
  checkIn?: string

  @IsDateString()
  @IsOptional()
  checkOut?: string

  @IsNumber()
  @IsOptional()
  nights?: number

  @IsNumber()
  @IsOptional()
  roomPriceTotal?: number

  // Guide
  @IsString()
  @IsOptional()
  guideId?: string

  @IsDateString()
  @IsOptional()
  serviceDate?: string

  @IsNumber()
  @IsOptional()
  serviceHours?: number

  @IsNumber()
  @IsOptional()
  guideFee?: number

  // Experience
  @IsString()
  @IsOptional()
  experienceId?: string

  @IsNumber()
  @IsOptional()
  experienceFee?: number

  // Financials
  @IsString()
  @IsOptional()
  currency?: string

  @IsNumber()
  @IsOptional()
  exchangeRate?: number
}
