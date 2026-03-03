import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  async sendNotification(userId: string, message: string) {
    // Mock implementation
    return { success: true, message: 'Notification sent' };
  }
}
