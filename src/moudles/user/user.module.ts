/*
 * @Date: 2024-04-25 11:53:09
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-04-28 20:22:26
 * @FilePath: /yh_serve/src/moudles/user/user.module.ts
 */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RoleModule } from '../role/role.module';
import { MenuModule } from '../menu/menu.module';

@Module({
  imports: [
    // 导入其他模块
    TypeOrmModule.forFeature([User]),
    RoleModule,
    MenuModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
