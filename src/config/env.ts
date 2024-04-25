/*
 * @Date: 2024-04-25 10:59:07
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-04-25 18:23:31
 * @FilePath: /yh_serve/config/env.ts
 */
import * as fs from 'node:fs';

import * as path from 'node:path';
//判断是开发环境还是生产环境
const isPord = process.env.NODE_ENV === 'production';
export const getEnvConfig = () => {
  const localPath = path.resolve('.env.dev');
  const prodPath = path.resolve('.env.prod');
  console.log(localPath, prodPath);

  if (!fs.existsSync(localPath) || !fs.existsSync(prodPath)) {
    throw new Error('未找到环境配置文件');
  }

  return isPord && fs.existsSync(prodPath) ? prodPath : localPath;
};
