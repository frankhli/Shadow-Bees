import { IsString, IsOptional, IsEnum } from 'class-validator'

export class SendMessageDto {
  @IsString()
  conversationId: string

  @IsString()
  senderId: string

  @IsString()
  content: string

  @IsString()
  @IsOptional()
  contentType?: string // 'text', 'image', 'file'
}
