import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3030;

  app.enableCors({
    origin: process.env.FRONTEND_URL || ['http://localhost:5173'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true, // ✅ 쿠키 포함 허용
  });

  await app.listen(port);
  console.log(`http://localhost:${port}`);
}
bootstrap();
