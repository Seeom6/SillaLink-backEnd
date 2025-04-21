import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController, AuthControllerWithToken } from './api/controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserModule } from 'src/modules/user/user.module';
import { JWTModule } from '@Package/auth/jwt';
import { JWTStrategy } from '@Package/auth/passport/strategy/jwt.strategy';
import {AuthError} from "@Modules/auth/services/auth.error";
import {MailService} from "@Package/services";

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JWTModule
  ],
  controllers: [AuthController, AuthControllerWithToken],
  providers: [AuthService, AuthError, JWTStrategy, MailService],
  exports: [JWTStrategy, PassportModule]
})
export class AuthModule {}
