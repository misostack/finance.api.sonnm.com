import { ExampleService } from './../services/example.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ExamplesController } from './examples.controller';
import { Example } from '@modules/example/interfaces/example.interface';
import { v4 as uuidv4 } from 'uuid';

const mockExampleService = {
  /* mock implementation
  ...
  */
  create(payload: Partial<Example>): Example {
    const now = new Date('2022-07-28T08:59:02.246Z');
    return {
      id: '1170b8c2-630a-4ad6-842d-ac7255213cf6',
      title: 'example 1',
      keywords: ['example'],
      content: 'example',
      tags: ['nestjs'],
      createdAt: now,
      updatedAt: now,
      ...payload,
    };
  },
};

describe('ExamplesController', () => {
  let controller: ExamplesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExamplesController],
      providers: [
        {
          provide: ExampleService,
          useValue: mockExampleService,
        },
      ],
    }).compile();

    controller = module.get<ExamplesController>(ExamplesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create new example', () => {
    it('should create a new example successfully if data is valid', () => {
      const now = new Date('2022-07-28T08:59:02.246Z');
      const responseValue = controller.create({
        title: 'example 1',
        keywords: ['example'],
        content: 'example',
        tags: ['nestjs'],
      });
      const expectedValue = {
        id: '1170b8c2-630a-4ad6-842d-ac7255213cf6',
        title: 'example 1',
        keywords: ['example'],
        content: 'example',
        tags: ['nestjs'],
        createdAt: now,
        updatedAt: now,
      };
      expect(responseValue).toMatchObject(expectedValue);
    });
  });
});
