import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3030;

  if (process.env.NODE_ENV === 'production') {
    app.enableCors({
      origin: true, // TODO : true말고 CORS 배열로 프론트주소를 담게 수정
      credentials: true,
    });
  } else {
    app.enableCors({
      origin: true,
      credentials: true,
    });
  }
  // https://192.168.0.5:3030
  await app.listen(port, '0.0.0.0');
  console.log(`http://localhost:${port}`);
}
bootstrap();
