import { Example } from '@modules/example/interfaces/example.interface';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Scope } from '@nestjs/common';

@Injectable({
  scope: Scope.DEFAULT,
})
export class ExampleService {
  static initialTimes = 0;
  constructor() {
    ExampleService.initialTimes++;
    console.log(
      `initExampleService times: ${ExampleService.initialTimes} `,
      new Date().toISOString(),
    );
  }
  create(payload: Partial<Example>): Example {
    const now = new Date();
    return {
      id: uuidv4(),
      title: '',
      keywords: [],
      content: '',
      tags: [],
      createdAt: now,
      updatedAt: now,
      ...payload,
    };
  }
}
