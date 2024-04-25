/*
 * @Date: 2024-04-25 14:38:53
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-04-25 14:53:23
 * @FilePath: /yh_serve/src/moudles/auth/dto/login.dto.ts
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';
export class LoginDto {
  @ApiProperty({
    description: '用户名',
    example: 'admin',
    required: true,
  })
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  readonly username: string;

  @ApiProperty({
    description: '密码',
    example: '123456',
    required: true,
  })
  @IsNotEmpty({
    message: '密码不能为空',
  })
  @Length(6, 20, {
    message: '密码长度为6-20位',
  })
  readonly password: string;
}
