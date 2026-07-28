import { NestFactory } from '@nestjs/core';
import { NotificationsServiceModule } from './notifications-service.module';
import { SERVICE_PORTS } from '@app/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { KAFKA_BROKER, KAFKA_CLIENT_ID } from '@app/kafka';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsServiceModule);

  //Connect kafka microservices for comsuming events
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: `${KAFKA_CLIENT_ID}-notifications`,
        brokers: [KAFKA_BROKER],
      },
      consumer: {
        groupId: `notifications-consumer-group`,
      },
    },
  });

  // Start microservices (kafka consumer)
  await app.startAllMicroservices();
  
  await app.listen(SERVICE_PORTS.NOTIFICATIONS_SERVICE);
  console.log(`Notification Service is running on port ${SERVICE_PORTS.NOTIFICATIONS_SERVICE}`);
  console.log('Kafka consumer started');

}
bootstrap();
