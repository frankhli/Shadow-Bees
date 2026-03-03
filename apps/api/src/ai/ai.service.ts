import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface GenerateContentRequest {
  hotel_name: string;
  city: string;
  facilities?: Record<string, boolean>;
  platform: 'tiktok' | 'xiaohongshu' | 'instagram' | 'booking';
  style?: string;
  language?: string;
}

export interface GenerateContentResponse {
  platform: string;
  language: string;
  content: string;
  hashtags: string[];
  suggestions?: string[];
}

@Injectable()
export class AIService {
  private readonly logger = new Logger(AIService.name);
  private readonly aiServiceUrl: string;

  constructor(private configService: ConfigService) {
    this.aiServiceUrl = this.configService.get<string>('AI_SERVICE_URL') || 'http://localhost:5000';
  }

  async generateContent(request: GenerateContentRequest): Promise<GenerateContentResponse> {
    try {
      this.logger.log(`Generating content for ${request.platform} in ${request.language}`);
      
      const response = await fetch(`${this.aiServiceUrl}/ai/generate/content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`AI service error: ${response.statusText}`);
      }

      const data = await response.json();
      return data as GenerateContentResponse;
    } catch (error) {
      this.logger.error('Failed to generate content', error.message);
      throw error;
    }
  }

  async getTemplates(): Promise<any> {
    try {
      const response = await fetch(`${this.aiServiceUrl}/ai/templates`);
      if (!response.ok) {
        throw new Error(`AI service error: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      this.logger.error('Failed to get templates', error.message);
      throw error;
    }
  }
}
