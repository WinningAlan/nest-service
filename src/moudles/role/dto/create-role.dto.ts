import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

/*
 * @Date: 2024-04-25 20:44:20
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-04-26 09:47:38
 * @FilePath: /yh_serve/src/moudles/role/dto/create-role.dto.ts
 */
export class CreateRoleDto {
  // 角色名称
  @ApiProperty({
    description: '角色名称',
    example: '超级管理员',
  })
  @IsNotEmpty({
    message: '角色名称不能为空',
  })
  readonly name: string;

  @ApiProperty({
    description: '角色描述',
    example: '超级管理员',
    required: false,
  })
  // 角色描述
  readonly description: string;

  @ApiProperty({
    description: '角色唯一标识',
    example: 'admin',
    required: true,
  })
  readonly code: string;
}
