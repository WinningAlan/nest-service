/*
 * @Date: 2024-04-25 11:53:09
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-04-26 11:42:16
 * @FilePath: /yh_serve/src/moudles/user/entities/user.entity.ts
 */
import { Role } from '@/moudles/role/entities/role.entity';
import { SEX } from 'src/utils/enum';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('user')
export class User {
  //用户id
  @PrimaryGeneratedColumn('uuid', { comment: '用户id' })
  id: string;

  //用户名称
  @Column({ comment: '用户名', type: 'varchar', length: 50 })
  username: string;

  //用户密码
  @Column({
    comment: '用户加密密码',
    type: 'varchar',
    length: 200,
    select: false,
  })
  password: string;

  //创建时间
  @CreateDateColumn({
    comment: '用户创建时间',
    type: 'timestamp',
  })
  createTime: Date;

  //更新时间
  @UpdateDateColumn({
    comment: '用户更新时间',
    type: 'timestamp',
  })
  updateTime: Date;

  //逻辑删除
  @Column({ comment: '用户是否删除', type: 'bool', default: false })
  isDelete: boolean;
  //用户状态
  @Column({ comment: '用户状态', type: 'tinyint', default: 1 })
  status: number;
  //邮箱
  @Column({ comment: '用户邮箱', type: 'varchar', length: 50, default: null })
  email: string;

  //手机号
  @Column({ comment: '用户手机号', type: 'varchar', length: 11, default: null })
  phone: string;

  //用户头像
  @Column({ comment: '用户头像', type: 'varchar', length: 200, default: null })
  avatar: string;

  //性别
  @Column({ comment: '用户性别', type: 'enum', enum: SEX, default: SEX.FEMALE })
  sex: SEX;

  //年龄
  @Column({ comment: '用户年龄', type: 'tinyint', default: null })
  age: number;

  //生日
  @Column({ comment: '用户生日', type: 'date', default: null })
  birthday: Date;

  //用户别名
  @Column({ comment: '用户别名', type: 'varchar', length: 50, default: null })
  nickname: string;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({ name: 'user_role' })
  roles: Role[];
}
