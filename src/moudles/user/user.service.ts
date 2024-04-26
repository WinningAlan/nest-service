/*
 * @Date: 2024-04-25 11:53:09
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-04-26 11:44:34
 * @FilePath: /yh_serve/src/moudles/user/user.service.ts
 */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { responseResult, createPassword } from '../../utils';
import { Response } from '../../utils/types';
import { RoleService } from '../role/role.service';
import { UserRoleDto } from './dto/user-role.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly roleService: RoleService,
  ) {}
  /*
   * @description: 创建用户
   * @param {CreateUserDto} createUserDto
   * @return {*}
   * @author: shubings
   */

  async create(createUserDto: CreateUserDto): Promise<Response<null>> {
    const user = await this.findByName(createUserDto.username);

    if (user) {
      throw new HttpException('用户名已存在', HttpStatus.OK);
    }
    try {
      // 加密密码
      createUserDto.password = createPassword(createUserDto.password);
      console.log(user);
      await this.userRepository.save(createUserDto);
    } catch (error) {
      return responseResult(null, '注册失败', -1);
    }
    return responseResult(null, '注册成功', 200);
  }

  /*
   * @description: 根据用户名查询用户
   * @param {string} username
   * @return {*} Promise<User>
   * @author: shubings
   */
  findByName(username: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        username,
        isDelete: false,
      },
      relations: {
        roles: true,
      },
    });
  }

  /*
   * @description: 获取所有用户
   * @param {string} username
   * @return {*} Promise<User>
   * @author: shubings
   */
  async findAll(): Promise<Response<User[]>> {
    const data = await this.userRepository.find({
      where: {
        isDelete: false,
      },
    });
    return responseResult(data);
  }

  /*
   * @description: 根据用户id获取用户信息
   * @param {string} username
   * @return {*} Promise<User>
   * @author: shubings
   */
  async findOne(id: string): Promise<Response<User>> {
    const data = await this.userRepository.findOne({
      where: {
        id,
        isDelete: false,
      },
      relations: {
        roles: true,
      },
    });
    return responseResult(data);
  }

  /*
   * @description: 根据用户id获取用户信息
   * @param {string} id 用户id
   * @param {UpdateUserDto} updateUserDto 更新用户信息
   * @return {*}
   * @author: shubings
   */
  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<Response<null>> {
    const user = await this.findOne(id);
    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.OK);
    }
    try {
      await this.userRepository.update(id, updateUserDto);
    } catch (error) {
      return responseResult(null, '更新失败', -1);
    }
    return responseResult(null, '更新成功', 200);
  }
  /*
   * @description: 根据用户id删除用户
   * @param {string} id 用户id
   * @return {*}
   * @author: shubings
   */
  async remove(id: string): Promise<Response<null>> {
    const user = await this.findOne(id);
    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.OK);
    }
    try {
      await this.userRepository.update(id, { isDelete: true });
    } catch (error) {
      return responseResult(null, '删除失败', -1);
    }
    return responseResult(null, '删除成功', 200);
  }

  async userLinkRole(id: string, userRoleDto: UserRoleDto) {
    const user = await this.userRepository.findOne({
      where: { id, isDelete: false },
      relations: { roles: true },
    });
    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.OK);
    }
    const roles = await this.roleService.findByIds(userRoleDto.roleIds);

    user.roles = roles;
    console.log(user);
    try {
      await this.userRepository.save(user);
    } catch (error) {
      console.log(error);
      return responseResult(null, '更新失败', -1);
    }
    return responseResult(null, '更新成功', 200);
  }
}
