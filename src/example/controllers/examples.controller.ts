import { Example } from './../interfaces/example.interface';
import { ExampleService } from './../services/example.service';
import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { Body } from '@nestjs/common';

@Controller('examples')
export class ExamplesController {
  constructor(private exampleService: ExampleService) {}
  // index, show, create, update, destroy
  @Get()
  index() {
    return [];
  }

  @Get(':id')
  show() {
    return {};
  }

  @Post('')
  create(@Body() payload): Example {
    const example: Example = this.exampleService.create(payload);
    return example;
  }

  @Patch(':id')
  update() {
    return {};
  }

  @Delete(':id')
  remove() {
    return {};
  }
}
