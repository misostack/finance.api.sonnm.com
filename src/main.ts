import { Environment } from '@config/environment';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configValues = Environment.getConfigValues();
  if (!Environment.validateConfigValues(configValues)) {
    throw new Error('Missing environment values');
  }

  await app.listen(configValues.PORT);
}
bootstrap();
