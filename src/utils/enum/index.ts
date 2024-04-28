/*
 * @Date: 2024-04-25 10:45:08
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-04-26 13:33:25
 * @FilePath: /yh_serve/src/utils/enum/index.ts
 */
/**
 * @description: 性别
 * @author: shubings
 */
export enum SEX {
  FEMALE = '0', // 女
  MALE = '1', // 男
  PRIVACY = '2', // 隐私
}
/**
 * @description: 请求操作类型
 * @author: shubings
 */
export enum MESSAGE {
  SUCCESS = '操作成功',
  ERROR = '操作失败',
}

/**
 * @description: 返回成功失败的
 * @author: shubings
 */
export enum CODE {
  SUCCESS = 200,
  ERROR = -1,
}

/**
 * @description: 菜单类型
 * @author: shubings
 */
export enum MENU_TYPE {
  CATALOG = '0', // 目录
  MENU = '1', // 菜单
  BUTTON = '2', // 按钮
  EXTERNAL_LINK = '3', //外链接
}
