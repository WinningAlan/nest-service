/*
 * @Date: 2024-04-25 15:10:44
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-04-25 20:08:43
 * @FilePath: /yh_serve/src/moudles/auth/local.strategy.ts
 */
import { PassportStrategy } from '@nestjs/passport';
import { IStrategyOptions, Strategy } from 'passport-local';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { checkPassword } from '@/utils';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    } as IStrategyOptions);
  }
  // 验证用户登录
  async validate(username: string, password: string): Promise<any> {
    console.log(username, password);
    const user = await this.authService.validateUser(username);
    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.OK);
    }
    if (!checkPassword(password, user.password)) {
      throw new HttpException('密码错误', HttpStatus.OK);
    }
    delete user.password;
    return user;
  }
}
