import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DatabaseService } from './tasks/db.provider';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    ['/api'],
    basicAuth({
      users: { admin: 'password123' },
      challenge: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Todo List API')
    .setDescription('API для работы с задачами')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const databaseService = app.get(DatabaseService);
  await databaseService.testConnection(); // Проверка подключения

  await app.listen(3000);
}
bootstrap();
