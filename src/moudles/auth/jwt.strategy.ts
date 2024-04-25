/*
 * @Date: 2024-04-25 16:12:59
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-04-25 18:14:25
 * @FilePath: /yh_serve/src/moudles/auth/jwt.strategy.ts
 */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configServiec: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configServiec.get('JWT_SECRET'), // 设置与签发时相同的密钥
    } as StrategyOptions);
  }

  async validate(payload: any) {
    console.log('payload:', payload);
    const user = await this.authService.validateUser(payload.username);
    if (!user) {
      throw new UnauthorizedException('token不正确');
    }
    return { id: payload.id, username: payload.username };
  }
}
