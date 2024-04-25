/*
 * @Date: 2024-04-25 10:07:47
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-04-25 17:43:01
 * @FilePath: /yh_serve/src/main.ts
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/http-exception/http-exception.filter';
import { TransformInterceptor } from './common/transform/transform.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // 创建Nest应用程序
  //使用fastify开发速度快 默认是express
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  //启用CORS解决跨域
  app.enableCors();

  //设置全局前缀
  app.setGlobalPrefix('/api/v1');

  //设置全局过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  //设置全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor());

  //设置全局验证器
  app.useGlobalPipes(new ValidationPipe());

  //设置Swagger
  const document = new DocumentBuilder()
    .setTitle('API文档')
    .setVersion('1.0')
    .setDescription('悦禾食品')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    .build();
  const documentation = SwaggerModule.createDocument(app, document);
  SwaggerModule.setup('api', app, documentation);
  console.log('服务Swagger，请访问 http://localhost:3000/api');

  //启动应用程序
  await app.listen(3000, '0.0.0.0');
  console.log('服务已启动，请访问 http://localhost:3000');
}
bootstrap();
