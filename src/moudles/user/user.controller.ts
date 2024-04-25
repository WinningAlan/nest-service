/*
 * @Date: 2024-04-25 11:53:09
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-04-25 18:16:13
 * @FilePath: /yh_serve/src/moudles/user/user.controller.ts
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { IsPublic } from '@/utils/setMetaData';

@Controller('user')
@ApiTags('用户管理')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @IsPublic()
  @ApiOperation({ summary: '用户注册', description: '用户注册' })
  @ApiBody({ type: CreateUserDto, description: '用户注册DTO' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('/getUserList')
  @ApiOperation({ summary: '获取所有用户', description: '获取所有用户' })
  findAll() {
    return this.userService.findAll();
  }

  @Get('/getUserInfo/:id')
  @ApiOperation({ summary: '获取用户信息', description: '获取用户信息' })
  @ApiParam({ name: 'id', description: '用户ID', required: true })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch('/updateUserInfo/:id')
  @ApiOperation({ summary: '更新用户信息', description: '更新用户信息' })
  @ApiParam({ name: 'id', description: '用户ID', required: true })
  @ApiBody({ type: UpdateUserDto, description: '更新用户信息DTO' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('/deleteUser/:id')
  @ApiOperation({ summary: '删除用户', description: '删除用户' })
  @ApiParam({ name: 'id', description: '用户ID', required: true })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
