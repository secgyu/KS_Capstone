import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ImageModule } from './image/image.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FavoriteModule } from './favorite/favorite.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true,
      // SSL 옵션 추가
      ssl: {
        rejectUnauthorized: false, // RDS나 자체 CA가 있을 경우 true로 교체하고 CA 인증서 경로 지정
      },
      // Node.js pg 드라이버용 추가 옵션 (필요 시)
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    PostModule,
    AuthModule,
    ImageModule,
    FavoriteModule,
  ],
  providers: [ConfigService],
})
export class AppModule { }
