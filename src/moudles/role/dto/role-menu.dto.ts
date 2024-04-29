/*
 * @Date: 2024-04-28 09:37:51
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-04-28 09:38:35
 * @FilePath: /yh_serve/src/moudles/role/dto/role-menu.dto.ts
 */
import { ApiProperty } from '@nestjs/swagger';

export class RoleMenuDto {
  @ApiProperty({
    description: '菜单Ids',
    example: [
      'c6f5d472-de32-45e7-87f0-93922060fc60',
      'c6f5d472-de32-45e7-87f0-93922060fc60',
    ],
    required: true,
    // type: 'number',
  })
  ids: string[];
}
