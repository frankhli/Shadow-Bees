import { IsString, IsNumber, IsOptional, Min, Max } from 'class-validator'

export class CreateReviewDto {
  @IsString()
  guideId: string

  @IsString()
  orderId: string

  @IsString()
  reviewerId: string

  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(5)
  communication?: number

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(5)
  knowledge?: number

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(5)
  punctuality?: number

  @IsString()
  @IsOptional()
  title?: string

  @IsString()
  content: string
}
