import { Module } from '@nestjs/common';
import { ExamplesController } from './controllers/examples.controller';
import { ExampleGroupsController } from './controllers/example-groups.controller';
import { ExampleService } from './services/example.service';

@Module({
  controllers: [ExamplesController, ExampleGroupsController],
  providers: [ExampleService],
})
export class ExampleModule {}
