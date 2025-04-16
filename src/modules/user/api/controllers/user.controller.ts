import { Body, Get, Param, Patch, Post } from '@nestjs/common';
import { AuthController, IPagination, Pagination } from '@Package/api';
import { CreateUserDto } from '../dto/request/create-user.dto';
import { UserService } from "../../services/user.service"

@AuthController({
   prefix: 'users',
})
export class UserController {
   constructor(
      private readonly UserService: UserService
   ){}



   @Post("")
   async create(@Body() data: CreateUserDto){
      return await this.UserService.createUser(data)
   }

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
