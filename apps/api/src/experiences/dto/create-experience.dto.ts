import { IsString, IsOptional, IsNumber, IsArray } from 'class-validator'

export class CreateExperienceDto {
  @IsString()
  name: string

  @IsString()
  @IsOptional()
  nameEn?: string

  @IsString()
  type: 'WORKSHOP' | 'DINING' | 'SHOPPING' | 'TOUR'

  @IsString()
  city: string

  @IsString()
  @IsOptional()
  address?: string

  @IsNumber()
  @IsOptional()
  lat?: number

  @IsNumber()
  @IsOptional()
  lng?: number

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  descriptionEn?: string

  @IsNumber()
  pricePerPerson: number

  @IsNumber()
  durationMinutes: number

  @IsNumber()
  maxCapacity: number

  @IsArray()
  @IsOptional()
  photos?: string[]

  @IsOptional()
  partnerContract?: Record<string, any>
}
