import * as compression from 'compression';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(compression());

  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  const logger = app.get(Logger);

  const PORT = process.env.PORT || 5000;
  await app.listen(PORT);

  logger.log(`Server listening on: ${await app.getUrl()}`);
}
bootstrap();
