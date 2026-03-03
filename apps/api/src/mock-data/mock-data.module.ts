import { Module } from '@nestjs/common'
import { MockDataController } from './mock-data.controller'
import { MockAuthController } from './mock-auth.controller'
import { MockDataService } from './mock-data.service'

@Module({
  controllers: [MockDataController, MockAuthController],
  providers: [MockDataService],
  exports: [MockDataService],
})
export class MockDataModule {}
