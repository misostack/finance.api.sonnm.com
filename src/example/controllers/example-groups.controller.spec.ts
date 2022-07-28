import { Test, TestingModule } from '@nestjs/testing';
import { ExampleGroupsController } from './example-groups.controller';

describe('ExampleGroupsController', () => {
  let controller: ExampleGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExampleGroupsController],
    }).compile();

    controller = module.get<ExampleGroupsController>(ExampleGroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
