import * as compression from 'compression';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(compression());

  app.setGlobalPrefix('/v1/api');

  const PORT = process.env.PORT || 5000;
  await app.listen(PORT, () => {
    console.log('Server listening on:', `http://localhost:${PORT}`);
  });
}
bootstrap();
