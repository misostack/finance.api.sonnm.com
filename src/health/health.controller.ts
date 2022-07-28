import { Model } from 'mongoose';
import { Company } from '@modules/database/models';
import { Controller, Get, Inject } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import {
  HealthCheck,
  HealthCheckService,
  MongooseHealthIndicator,
} from '@nestjs/terminus';
import { Connection } from 'mongoose';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: MongooseHealthIndicator,
    @Inject('DefaultConnection')
    private connection: Connection,
    @Inject('COMPANY_MODEL')
    private companyModel: Model<Company>,
  ) {}

  @Get()
  @HealthCheck()
  async check() {
    // await this.companyModel.create({ name: 'dasd' });
    const totalOfCompany = await this.companyModel.count();
    console.log({ totalOfCompany });
    console.log(this.connection.readyState);

    return this.health.check([
      () =>
        this.db.pingCheck('database', {
          connection: this.connection,
          timeout: 5000,
        }),
    ]);
  }
}
