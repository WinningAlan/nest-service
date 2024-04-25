/*
 * @Date: 2024-04-25 11:53:09
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-04-25 13:07:47
 * @FilePath: /yh_serve/src/moudles/user/dto/create-user.dto.ts
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  // 用户名
  @ApiProperty({
    description: '用户名',
    example: 'yh',
    required: true,
  })
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  // 密码
  @ApiProperty({
    description: '密码',
    example: '123456',
    required: true,
  })
  @IsNotEmpty({ message: '密码不能为空' })
  @Length(6, 20, { message: '密码长度必须在6到20之间' })
  password: string;
}
