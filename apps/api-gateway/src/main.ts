import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SERVICE_PORTS } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(SERVICE_PORTS.API_GATEWAY);

  console.log(`API Gateway is running on port ${SERVICE_PORTS.API_GATEWAY}`);
}
bootstrap();
