import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { setApplicationConfig } from './config/app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setApplicationConfig(app);
  await app.listen(3001);
}
bootstrap();
