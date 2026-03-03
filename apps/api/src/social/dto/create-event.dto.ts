import { IsString, IsOptional, IsNumber, IsDateString, IsEnum } from 'class-validator'

export class CreateEventDto {
  @IsString()
  organizerId: string

  @IsString()
  organizerType: string

  @IsString()
  title: string

  @IsString()
  @IsOptional()
  titleEn?: string

  @IsString()
  description: string

  @IsString()
  @IsOptional()
  descriptionEn?: string

  @IsString()
  type: string

  @IsString()
  city: string

  @IsString()
  meetingPoint: string

  @IsString()
  @IsOptional()
  meetingPointEn?: string

  @IsDateString()
  eventDate: string

  @IsNumber()
  duration: number

  @IsNumber()
  maxPeople: number

  @IsNumber()
  @IsOptional()
  price?: number

  @IsString()
  @IsOptional()
  currency?: string
}
