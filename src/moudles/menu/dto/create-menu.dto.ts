/*
 * @Date: 2024-04-26 09:41:50
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-04-26 13:48:58
 * @FilePath: /yh_serve/src/moudles/menu/dto/create-menu.dto.ts
 */
import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuDto {
  @ApiProperty({
    description: '菜单名称',
    example: '菜单名称',
  })
  title: string;

  @ApiProperty({
    description: '菜单路径',
    example: '菜单路径',
  })
  path: string;

  @ApiProperty({
    description: '菜单图标',
    example: '菜单图标',
    required: false,
  })
  icon: string;

  @ApiProperty({
    description: '菜单排序',
    example: '菜单排序',
    required: false,
  })
  sort: number;

  @ApiProperty({
    description: '菜单类型',
    example: '菜单类型',
    required: false,
  })
  type: number;

  @ApiProperty({
    description: '父级菜单id',
    example: '父级菜单id',
    required: false,
  })
  parentId: string;

  @ApiProperty({
    description: '菜单状态',
    example: '菜单状态',
    required: false,
  })
  status: number;

  @ApiProperty({
    description: '菜单备注',
    example: '菜单备注',
    required: false,
  })
  remark: string;

  @ApiProperty({
    description: '菜单跳转',
    example: '菜单跳转',
    required: false,
  })
  redirect: string;
}
