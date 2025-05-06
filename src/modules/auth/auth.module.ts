import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import {AuthController, AuthControllerWithToken, RefreshController} from './api/controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserModule } from 'src/modules/user/user.module';
import {JwtAuthGuard, JWTModule} from '@Package/auth/jwt';
import { JWTStrategy } from '@Package/auth/passport/strategy/jwt.strategy';
import {AuthError} from "@Modules/auth/services/auth.error";
import {MailService} from "@Package/services";
import { AuthAdminService } from './services/auth.admin.service';
import { AuthAdminController } from './api/controllers/auth.admin.controller';
import {RefreshTokenGuard} from "@Package/auth/guards";
import {RefreshTokenStrategy} from "@Package/auth/passport/strategy/refresh-token.strategy";
import {StrategyConstant} from "@Package/auth";
import {RedisService} from "@Package/cache";
@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: [StrategyConstant.refresh_Token, StrategyConstant.jwt, ] }),
    JWTModule
  ],
  controllers: [
    AuthController,
    AuthControllerWithToken,
    AuthAdminController,
    RefreshController
  ],
  providers: [
    AuthService,
    AuthAdminService,
    AuthError,
    JWTStrategy,
    MailService,
    JwtAuthGuard,
    RefreshTokenGuard,
    RedisService,
    RefreshTokenStrategy
  ],
  exports: [JWTStrategy, PassportModule]
})
export class AuthModule {}
