import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

// Feature Module
import { GoldModule } from '@modules/gold/gold.module';
import { HealthModule } from './health/health.module';

const routes = [
  { path: '', module: HealthModule },
  { path: 'gold', module: GoldModule },
];

@Module({
  imports: [GoldModule, HealthModule, RouterModule.register(routes)],
  controllers: [],
  providers: [],
})
export class AppModule {}
