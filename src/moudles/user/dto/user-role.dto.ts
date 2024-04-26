/*
 * @Date: 2024-04-26 11:02:25
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-04-26 11:05:58
 * @FilePath: /yh_serve/src/moudles/user/dto/user-role.dto.ts
 */
import { ApiProperty } from '@nestjs/swagger';

export class UserRoleDto {
  @ApiProperty({ description: '角色ids', example: '[1,2,3,4]' })
  roleIds: string[];
}
