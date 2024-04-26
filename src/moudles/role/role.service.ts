/*
 * @Date: 2024-04-25 20:44:20
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-04-26 11:10:24
 * @FilePath: /yh_serve/src/moudles/role/role.service.ts
 */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { responseResult } from '@/utils';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}
  /*
   * @description: 创建角色
   * @param {CreateRoleDto} createRoleDto 角色信息
   * @return {*}
   * author: shubings
   */
  async create(createRoleDto: CreateRoleDto, user) {
    let role = await this.findByCode(createRoleDto.code);
    if (role) {
      throw new HttpException('角色code已存在', HttpStatus.OK);
    }
    role = await this.findByName(createRoleDto.name);
    if (role) {
      throw new HttpException('角色name已存在', HttpStatus.OK);
    }
    await this.roleRepository.save({
      ...createRoleDto,
      createUserId: user.id,
      createUserName: user.username,
    });
    return responseResult(null, '角色创建成功', 200);
  }
  /*
   * @description: 查询角色列表
   * @return {*}
   */
  async findAll() {
    const roles = await this.roleRepository.find({
      where: { isDelete: false },
    });
    return responseResult(roles, '查询角色列表成功', 200);
  }

  /*
   * @description: 更新角色
   * @param {string} id 角色id
   * @param {UpdateRoleDto} updateRoleDto 角色信息
   * @return {*}
   * author: shubings
   */
  async update(id: string, updateRoleDto: UpdateRoleDto, user) {
    const role = await this.findById(id);
    if (!role) {
      throw new HttpException('角色不存在', HttpStatus.OK);
    }
    await this.roleRepository.update(id, {
      ...updateRoleDto,
      updateUserId: user.id,
      updateUserName: user.username,
    });

    return responseResult(null, '角色更新成功', 200);
  }

  /*
   * @description: 删除角色
   * @param {string} id 角色id
   * @return {*}
   */
  async remove(id: string, user) {
    const role = await this.findById(id);
    if (!role) {
      throw new HttpException('角色不存在', HttpStatus.OK);
    }
    await this.roleRepository.update(id, {
      isDelete: true,
      updateUserId: user.id,
      updateUserName: user.username,
    });
    return responseResult(null, '角色删除成功', 200);
  }

  /*
   * @description: 查询角色
   * @param {string} code 角色code
   * @return {*}
   */
  findByCode(code: string): Promise<Role> {
    return this.roleRepository.findOne({ where: { code, isDelete: false } });
  }

  /*
   * @description: 查询角色
   * @param {string} name 角色name
   * @return {*}
   */
  findByName(name: string) {
    return this.roleRepository.findOne({ where: { name, isDelete: false } });
  }

  /*
   * @description: 查询角色
   * @param {string} id 角色id
   * @return {*}
   */
  findById(id: string) {
    return this.roleRepository.findOne({ where: { id, isDelete: false } });
  }

  async findOne(id: string) {
    const role = await this.findById(id);
    if (!role) {
      throw new HttpException('角色不存在', HttpStatus.OK);
    }
    return responseResult(role, '查询角色成功', 200);
  }

  /*
   * @description: 查询角色
   * @param {string[]} ids 角色id
   * @return {*}
   */
  async findByIds(ids: string[]) {
    return this.roleRepository.find({
      where: { id: In(ids), isDelete: false },
    });
  }
}
