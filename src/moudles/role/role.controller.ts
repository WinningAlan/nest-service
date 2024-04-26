/*
 * @Date: 2024-04-25 20:44:20
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-04-26 10:43:45
 * @FilePath: /yh_serve/src/moudles/role/role.controller.ts
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('role')
@ApiTags('角色管理')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('/create')
  @ApiOperation({
    summary: '创建角色',
    description: '创建角色',
  })
  @ApiBody({
    type: CreateRoleDto,
    description: '创建角色',
  })
  create(@Body() createRoleDto: CreateRoleDto, @Req() req) {
    return this.roleService.create(createRoleDto, req.user);
  }

  @Get('/getAll')
  @ApiOperation({
    summary: '获取所有角色',
    description: '获取所有角色',
  })
  findAll() {
    return this.roleService.findAll();
  }

  @Get('/getById/:id')
  @ApiOperation({
    summary: '根据id获取角色',
    description: '根据id获取角色',
  })
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id);
  }

  @Patch('/update/:id')
  @ApiOperation({
    summary: '更新角色',
    description: '更新角色',
  })
  @ApiBody({
    type: UpdateRoleDto,
    description: '更新角色',
  })
  update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
    @Req() req,
  ) {
    return this.roleService.update(id, updateRoleDto, req.user);
  }

  @Delete('/delete/:id')
  @ApiOperation({
    summary: '删除角色',
    description: '删除角色',
  })
  remove(@Param('id') id: string, @Req() req) {
    return this.roleService.remove(id, req.user);
  }
}
