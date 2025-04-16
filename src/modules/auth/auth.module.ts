import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './api/controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserModule } from 'src/modules/user/user.module';
import { JWTModule } from '@Package/auth/jwt';
import { JWTStrategy } from '@Package/auth/passport/strategy/jwt.strategy';
import {AuthError} from "@Modules/auth/services/auth.error";

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JWTModule
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthError, JWTStrategy],
  exports: [JWTStrategy, PassportModule]
})
export class AuthModule {}
