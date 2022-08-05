import 'reflect-metadata';
import { Environment } from '@config/environment';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomValidationPipe } from '@modules/common/pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configValues = Environment.getConfigValues();
  if (!Environment.validateConfigValues(configValues)) {
    throw new Error('Missing environment values');
  }

  // app.useGlobalPipes(
  //   new CustomValidationPipe({
  //     skipMissingProperties: false,
  //     stopAtFirstError: false,
  //   }),
  // );

  await app.listen(configValues.PORT);
}
bootstrap();
