import { Injectable } from '@nestjs/common';
import { UserRepository } from '../database/user.repository';
import { IPagination } from '@Package/api';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findById(id: string) {
    return this.userRepository.findOne({filter: {_id: id},error: null});
  }

  async findUserByEmail(email: string, throwError = true) {
    return await this.userRepository.findUserByEmail(email, throwError);
  }

  async createUser(userInfo){
    return await this.userRepository.createUser(userInfo);
  }

  async getAllUsers(
    pagination?: IPagination,
  ) {
    return this.userRepository.findAllUsers(pagination);
  }
}
