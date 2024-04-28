/*
 * @Date: 2024-04-25 14:38:53
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-04-28 09:25:45
 * @FilePath: /yh_serve/src/moudles/auth/auth.service.ts
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { responseResult } from '@/utils';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  /*
   *登录验证
   *@param username 用户名
   *@returns 用户信息
   */
  async validateUser(username: string): Promise<any> {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .andWhere('user.isDelete = :isDelete', { isDelete: false })
      .addSelect('user.password')
      .getOne();
  }

  /*
   *注册
   *@param id 用户信息
   *@returns 用户信息
   */
  async findByUserId(id: string) {
    return await this.userRepository.findOne({
      where: { id, isDelete: false },
    });
  }

  /*
   *登录返回token
   *@param user 用户信息
   *@returns token
   */
  async login(user: Partial<User>) {
    const token = await this.createToken(user);
    return responseResult(
      {
        token,
      },
      '登录成功',
    );
  }
  /*
   *创建token
   *@param user 用户信息
   *@returns token
   */
  async createToken(user: Partial<User>): Promise<string> {
    const payload = { username: user.username, id: user.id };
    const token = await this.jwtService.sign(payload);
    return token;
  }

  /*
   *验证token
   *@param token token
   *@returns boolean
   */
  async verifyToken(token: string): Promise<User> {
    const payload = await this.jwtService.verify(token, {
      secret: this.configService.get('JWT_SECRET'),
    });
    return await this.findByUserId(payload.username);
  }
}
