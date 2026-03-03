import { Injectable } from '@nestjs/common';

@Injectable()
export class PmsService {
  async getStatus() {
    return { status: 'ok', message: 'PMS service running' };
  }
}
