import { Injectable } from '@nestjs/common';
import { UserRepository } from '../entity/user.repository';
import { IPagination } from '@Package/api';
import { User } from '../entity/user.schema';
import { CreateUserDto } from '../api/dto/request/create-user.dto';
import {ClientSession} from "mongoose";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findById(id: string) {
    return this.userRepository.findOne({filter: {_id: id},error: null});
  }

  async findUserByEmail(email: string, throwError = true) {
    return await this.userRepository.findUserByEmail(email, throwError);
  }

  async createUser(userInfo: CreateUserDto, options?: {session?: ClientSession}){
    return await this.userRepository.create({
      doc: {...userInfo} as User,
      options
    });
  }

  async getAllUsers(
    pagination?: IPagination,
  ) {
    return this.userRepository.findAllUsers(pagination);
  }
}
