/*
 * @Date: 2024-04-25 10:33:11
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-04-26 21:49:44
 * @FilePath: /yh_serve/src/utils/index.ts
 */
/*
 * @description:请求响应
 * @param {*} data 响应数据
 * @param {number} code 响应状态码
 * @param {string} message 响应消息
 * @return {*}
 * @author: shubings
 */

import * as crypto from 'crypto';
import { Response } from './types';
import { CODE, MESSAGE } from './enum';
import { PASSWPRD_SECRET } from './constant';

export const responseResult = <T>(
  data: T,
  message: string = MESSAGE.SUCCESS,
  code: number = CODE.SUCCESS,
): Response<T> => {
  return {
    code,
    message,
    data,
  };
};

/*
 * @description:密码加码
 * @param {*} passowrd 密码
 * @return {string} string
 * @author: shubings
 */
export const createPassword = (password: string) => {
  const hmac = crypto.createHmac('sha256', PASSWPRD_SECRET);
  return hmac.update(password).digest('hex');
};

/*
 * @description:密码加码验证
 * @param {*} passowrd 密码
 * @return {string} string
 * @author: shubings
 */
export const checkPassword = (password: string, passwordHash: string) => {
  return createPassword(password) === passwordHash;
};

/*
 * @description:构建树形结构
 * @param {*} data 数据
 * @return {*}
 * @author: shubings
 */
export function buildTree(arr, parentId = null) {
  const tree = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].parentId === parentId) {
      const node = { ...arr[i] };
      const children = buildTree(arr, arr[i].id);
      if (children.length > 0) {
        node.children = children;
      }
      tree.push(node);
    }
  }
  return tree;
}
