/*
 * @Date: 2024-04-25 14:38:53
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-04-25 17:19:46
 * @FilePath: /yh_serve/src/moudles/auth/auth.controller.ts
 */
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { IsPublic } from '@/utils/setMetaData';
@Controller('auth')
@ApiTags('权限管理')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @IsPublic()
  @ApiOperation({
    summary: '登录',
    description: '登录接口',
  })
  @ApiBody({
    type: LoginDto,
    description: '登录参数',
  })
  @UseGuards(AuthGuard('local'))
  login(@Body() loginDto: LoginDto, @Req() req) {
    return this.authService.login(req.user);
  }
}
