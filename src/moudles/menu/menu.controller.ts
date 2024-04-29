/*
 * @Date: 2024-04-26 09:41:50
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-04-28 09:55:10
 * @FilePath: /yh_serve/src/moudles/menu/menu.controller.ts
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
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('menu')
@ApiTags('菜单管理')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post('/create')
  @ApiOperation({
    summary: '创建菜单',
    description: '创建菜单',
  })
  @ApiBody({
    description: '创建菜单',
    type: CreateMenuDto,
  })
  create(@Body() createMenuDto: CreateMenuDto, @Req() req) {
    return this.menuService.create(createMenuDto, req.user);
  }

  @Get('/allList')
  @ApiOperation({
    summary: '获取菜单列表',
    description: '获取菜单列表',
  })
  findAll() {
    console.log('222');
    return this.menuService.findAll();
  }

  @Get('/menuInfo/:id')
  @ApiOperation({
    summary: '获取菜单信息',
    description: '获取菜单信息',
  })
  findOne(@Param('id') id: string) {
    return this.menuService.findById(id);
  }

  @Patch('/update/:id')
  @ApiOperation({
    summary: '更新菜单',
    description: '更新菜单',
  })
  @ApiBody({
    description: '更新菜单',
    type: UpdateMenuDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateMenuDto: UpdateMenuDto,
    @Req() req,
  ) {
    console.log(id, updateMenuDto, req.user);
    return this.menuService.update(id, updateMenuDto, req.user);
  }

  @Delete('/delete/:id')
  @ApiOperation({
    summary: '删除菜单',
    description: '删除菜单',
  })
  remove(@Param('id') id: string) {
    return this.menuService.remove(id);
  }
}
