import { Module } from '@nestjs/common';
import { ExamplesController } from './controllers/examples.controller';
import { ExampleGroupsController } from './controllers/example-groups.controller';
import { ExampleService } from './services/example.service';
import { DatabaseModule } from '@modules/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ExamplesController, ExampleGroupsController],
  providers: [ExampleService],
})
export class ExampleModule {}
