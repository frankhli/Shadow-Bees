import { IsEmail, IsString, IsOptional, IsEnum } from 'class-validator'
import { UserRole } from '@tiaohai/database'

export class RegisterDto {
  @IsEmail()
  email: string

  @IsString()
  password: string

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole
}
