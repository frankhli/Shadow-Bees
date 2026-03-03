import { IsString, IsOptional, IsNumber, IsArray, IsEmail } from 'class-validator'

export class CreateGuideDto {
  @IsEmail()
  email: string

  @IsString()
  password: string

  @IsString()
  name: string

  @IsString()
  @IsOptional()
  nameEn?: string

  @IsArray()
  @IsString({ each: true })
  languages: string[]

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  specialties?: string[]

  @IsString()
  @IsOptional()
  licenseNo?: string

  @IsString()
  city: string

  @IsString()
  @IsOptional()
  bio?: string

  @IsString()
  @IsOptional()
  bioEn?: string

  @IsNumber()
  @IsOptional()
  hourlyRate?: number
}
