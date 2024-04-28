/*
 * @Date: 2024-04-26 09:41:50
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-04-28 09:34:20
 * @FilePath: /yh_serve/src/moudles/menu/menu.service.ts
 */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';
import { User } from '../user/entities/user.entity';
import { buildTree, responseResult } from '@/utils';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {}
  /* 

    * @description: 创建菜单
    * @param {CreateMenuDto} createMenuDto
    * @return {*} Promise<ResponseResult>
    * @author: shubings
  */
  async create(createMenuDto: CreateMenuDto, user: Partial<User>) {
    const munu = await this.findByPath(createMenuDto.path);
    if (munu) {
      throw new HttpException('菜单已存在', HttpStatus.OK);
    }
    await this.menuRepository.save({
      ...createMenuDto,
      createUserId: user.id,
      createUserName: user.username,
    });
    return responseResult(null, '菜单创建成功');
  }

  /* 

  * @description: 获取菜单列表并转化成树结构
  * @return {*} Promise<ResponseResult>
  * @author: shubings
  * 
 */
  async findAll() {
    const menulist = await this.menuRepository.find({
      where: {
        isDelete: false,
      },
      order: {
        sort: 'ASC',
      },
    });
    console.log(menulist, 1111);
    return responseResult(buildTree(menulist), '获取菜单列表成功');
  }
  /* 

  * @description: 更新菜单
  * @param {string} id
  * @param {UpdateMenuDto} updateMenuDto  
  * @return {*} Promise<ResponseResult>
 */
  async update(id: string, updateMenuDto: UpdateMenuDto, user) {
    const menu = await this.findById(id);
    if (!menu.data) {
      throw new HttpException('菜单不存在', HttpStatus.OK);
    }
    await this.menuRepository.update(id, {
      ...updateMenuDto,
      updateUserId: user.id,
      updateUserName: user.username,
    });
    return responseResult(null, '菜单更新成功');
  }

  /* 

  * @description: 删除菜单
  * @param {string} id
  * @return {*} Promise<ResponseResult>
  * @author: shubings
   */

  async remove(id: string) {
    const res = await this.findById(id);
    if (!res.data) {
      throw new HttpException('菜单不存在', HttpStatus.OK);
    }
    await this.menuRepository.update(id, {
      isDelete: true,
    });
    return responseResult(null, '菜单删除成功');
  }

  /*
   * @description: 根据path查询菜单
   * @param {string} path
   * @return {*} Promise<Menu>
   * @author: shubings
   */
  async findByPath(path: string): Promise<Menu> {
    return await this.menuRepository.findOne({
      where: {
        path,
        isDelete: false,
      },
    });
  }
  /*
   * @description: 根据id查询菜单
   * @param {string} id
   * @return {*} Promise<ResponseResult>
   * @author: shubings
   */
  async findById(id: string) {
    const data = await this.menuRepository.findOne({
      where: {
        id,
        isDelete: false,
      },
    });
    return responseResult(data, '获取菜单信息成功');
  }

  /*
   * @description: 根据ids查询菜单
   * @param {string[]} ids
   * @return {*} Promise<Menu>
   */
  async findByIds(ids: string[]) {
    return await this.menuRepository.find({
      where: {
        id: In(ids),
        isDelete: false,
      },
    });
  }
}
