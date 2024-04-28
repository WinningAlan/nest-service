/*
 * @Date: 2024-04-26 09:41:50
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-04-26 13:48:34
 * @FilePath: /yh_serve/src/moudles/menu/entities/menu.entity.ts
 */
import { Role } from '@/moudles/role/entities/role.entity';
import { MENU_TYPE } from '@/utils/enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
@Entity('menu')
export class Menu {
  @PrimaryGeneratedColumn('uuid', { comment: '菜单id' })
  id: string;

  @Column({ comment: '菜单名称' })
  title: string;

  @Column({ comment: '菜单路径' })
  path: string;

  @Column({ comment: '菜单图标', default: null })
  icon: string;

  @Column({ comment: '父级菜单id', default: null })
  parentId: string;

  @Column({ comment: '菜单排序', default: 0 })
  sort: number;

  @Column({
    comment: '菜单类型',
    type: 'enum',
    enum: MENU_TYPE,
    default: MENU_TYPE.MENU,
  })
  type: number;

  @Column({ comment: '菜单状态', default: 1 })
  status: number;

  @Column({ comment: '菜单备注', default: null })
  remark: string;

  @CreateDateColumn({ comment: '创建时间' })
  createTime: Date;

  @UpdateDateColumn({ comment: '更新时间' })
  updateTime: Date;

  @Column({ comment: '创建人id', default: null })
  createUserId: string;

  @Column({ comment: '更新人id', default: null })
  updateUserId: string;

  @Column({ comment: '创建人名称', default: null })
  createUserName: string;

  @Column({ comment: '更新人名称', default: null })
  updateUserName: string;

  @Column({ comment: '是否删除', default: false, type: 'bool' })
  isDelete: boolean;

  //重定向
  @Column({ comment: '重定向地址', default: null })
  redirect: string;

  @ManyToMany(() => Role, (role) => role.menus)
  roles: Partial<Role[]>;
}
