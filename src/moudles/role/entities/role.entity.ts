/*
 * @Date: 2024-04-25 20:44:20
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-04-26 10:56:14
 * @FilePath: /yh_serve/src/moudles/role/entities/role.entity.ts
 */
import { User } from '@/moudles/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn('uuid', { comment: '角色id' })
  id: string;

  @Column({
    comment: '角色名称',
    type: 'varchar',
    length: 30,
  })
  name: string;

  @Column({ comment: '角色描述', default: null })
  description: string;

  @Column({ comment: '角色状态', type: 'tinyint', default: 1 })
  status: number;

  @Column({
    comment: '角色code',
    type: 'varchar',
    length: 30,
  })
  code: string;

  @CreateDateColumn({
    comment: '创建时间',
    type: 'timestamp',
  })
  createTime: Date;

  @UpdateDateColumn({
    comment: '更新时间',
    type: 'timestamp',
  })
  updateTime: Date;

  @Column({ comment: '是否删除', type: 'bool', default: false })
  isDelete: boolean;

  @Column({ comment: '创建人', default: null })
  createUserName: string;

  @Column({ comment: '更新人', default: null })
  updateUserName: string;

  @Column({ comment: '更新人id', default: null })
  updateUserId: string;

  @Column({ comment: '创建人id', default: null })
  createUserId: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
