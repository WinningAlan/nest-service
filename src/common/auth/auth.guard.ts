/*
 * @Date: 2024-04-25 17:07:30
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-04-25 20:17:16
 * @FilePath: /yh_serve/src/common/auth/auth.guard.ts
 */
import { AuthService } from '@/moudles/auth/auth.service';
import { IS_PUBLIC } from '@/utils/setMetaData';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authServiec: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 判断是否是公共接口
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ]);

    // 如果是公共接口，则直接返回true
    console.log(isPublic);
    if (isPublic) {
      return true;
    } else {
      // 判断是否携带token
      const ctx = context.switchToHttp();
      const request = ctx.getRequest();
      console.log(request.headers);
      const token = request.headers['authorization']?.split(' ')[1];
      if (!token) {
        // 如果没有携带token，则抛出UnauthorizedException异常
        throw new UnauthorizedException('请先登录');
      } else {
        try {
          // 携带token，则验证token是否有效
          const user = await this.authServiec.verifyToken(token);
          request['user'] = user;
          return true;
        } catch (error) {
          // 如果token无效，则抛出UnauthorizedException异常
          throw new UnauthorizedException('请先登录');
        }
      }
    }
    return true;
  }
}
