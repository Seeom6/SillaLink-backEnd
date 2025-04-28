import { Injectable } from '@nestjs/common';
import { UserRepository } from '../entity/user.repository';
import { User } from '@Modules/user';
import { CreateUserDto } from '../api/dto/request/create-user.dto';
import {ClientSession} from "mongoose";
import {Pagination} from "@Package/api";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findById(id: string) {
    return this.userRepository.findOne({filter: {_id: id}});
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
    pagination?: Pagination,
  ) {
    return this.userRepository.findAllUsers(pagination);
  }

  async updateUserByEmail(email: string, update: Partial<User>) {
    return await this.userRepository.findOneAndUpdate({
      filter: { email },
      update,
      options: { new: true }
    });
  }
}
