/*
 * @Date: 2024-04-25 17:15:26
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-04-25 18:13:29
 * @FilePath: /yh_serve/src/utils/setMetaData.ts
 */
import { SetMetadata } from '@nestjs/common';
// 设置元数据
export const IS_PUBLIC = 'isPublic';

export const IsPublic = () => SetMetadata(IS_PUBLIC, true);
