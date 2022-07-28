import { ExampleService } from './../services/example.service';
import { Controller } from '@nestjs/common';

@Controller('example-groups')
export class ExampleGroupsController {
  constructor(private exampleService: ExampleService) {}
  index() {
    return [];
  }
}
