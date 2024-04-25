/*
 * @Date: 2024-04-25 10:07:47
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-04-25 17:09:12
 * @FilePath: /yh_serve/src/app.module.ts
 */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getEnvConfig } from '../config/env';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './moudles/user/user.module';
import { AuthModule } from './moudles/auth/auth.module';
import { AuthGuard } from './common/auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    //全局配置项
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvConfig(),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        synchronize: true,
        logging: true,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        //自动插入字段
        timezone: '+8:00',
        dateStrings: true,
        charset: 'utf8mb4',
      }),
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
