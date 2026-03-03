import { IsString, IsOptional, IsNumber, IsDateString, IsArray } from 'class-validator'

export class CreateRoomShareDto {
  @IsString()
  organizerId: string

  @IsString()
  @IsOptional()
  hotelId?: string

  @IsString()
  hotelName: string

  @IsString()
  city: string

  @IsString()
  roomType: string

  @IsDateString()
  checkIn: string

  @IsDateString()
  checkOut: string

  @IsNumber()
  pricePerPerson: number

  @IsString()
  @IsOptional()
  currency?: string

  @IsNumber()
  maxPeople: number

  @IsString()
  description: string

  @IsString()
  @IsOptional()
  descriptionEn?: string

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[]
}
