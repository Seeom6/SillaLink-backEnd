import { Module } from '@nestjs/common';
import { UserAdminController } from './api/controllers/user.admin.controller';
import { UserService } from './services/user.service';
import { UserRepository } from './entity/user.repository';
import { User, UserSchema } from './entity/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UserAdminController],
  providers: [UserService ,UserRepository],
  exports: [UserService]
})
export class UserModule {}
