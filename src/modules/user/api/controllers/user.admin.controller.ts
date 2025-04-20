import { Body, Get, Param, Patch, Post } from '@nestjs/common';
import {AuthControllerAdmin, IPagination, Pagination, AllowRole} from '@Package/api';
import { CreateUserDto } from '../dto/request/create-user.dto';
import {User, UserRole, UserService} from "@Modules/user"

@AuthControllerAdmin({
   prefix: 'users',
})
export class UserAdminController {
   constructor(
      private readonly UserService: UserService
   ){}

   @Post("")
   async create(@Body() data: CreateUserDto){
      return await this.UserService.createUser(data)
   }

   @AllowRole(UserRole.ADMIN)
   @Get("")
   async getAllUsers(@Pagination() pagination: IPagination){
      return await this.UserService.getAllUsers(pagination)
   }

   // @Get("/find")
   // async find(@Query() filter: Partial<UserEntity>){
   //    return await this.UserService.(filter)
   // }

   @Patch(":id")
   async updateUser(){
      
   }

   @Get(":id")
   async getById(@Param('id') id:string){
      return await this.UserService.findById(id);
   }
}
