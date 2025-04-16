import { Module } from '@nestjs/common';
import { UserController } from './api/controllers/user.controller';
import { UserService } from './services/user.service';
import { UserRepository } from './database/user.repository';
import { User, UserSchema } from './database/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService ,UserRepository],
  exports: [UserService]
})
export class UserModule {}
