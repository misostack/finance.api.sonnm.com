import 'reflect-metadata';
import { Environment } from '@config/environment';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomValidationPipe } from '@modules/common/pipes';

import * as mongoSanitize from 'express-mongo-sanitize';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configValues = Environment.getConfigValues();
  if (!Environment.validateConfigValues(configValues)) {
    throw new Error('Missing environment values');
  }
  app.use(mongoSanitize());
  // app.use(
  //   mongoSanitize({
  //     replaceWith: '_',
  //   }),
  // );
  // app.useGlobalPipes(
  //   new CustomValidationPipe({
  //     skipMissingProperties: false,
  //     stopAtFirstError: false,
  //   }),
  // );

  await app.listen(configValues.PORT);
}
bootstrap();
