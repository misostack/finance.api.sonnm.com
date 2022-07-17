import { DatabaseModule } from '@modules/database/database.module';
import { Module } from '@nestjs/common';

import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';

@Module({
  imports: [DatabaseModule, TerminusModule],
  controllers: [HealthController],
})
export class HealthModule {}
