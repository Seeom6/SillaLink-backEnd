import {Body, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '@Modules/auth';
import { SingInDto } from '../dto/request/singIn.dto';
import { LogInValidationPipe } from '../validation/log-in.validation.pipe';
import { LogInDto } from '../dto/request/logIn.dto';
import { SingInValidationPipe } from '../validation/sing-in.validation.pipe';
import { ControllerWeb, AuthControllerWeb, User } from "src/package/api";
import {IRefreshToken, UserPayload} from 'src/package/auth';
import { RequestPasswordResetValidationPipe } from '../validation/request-password-reset.validation.pipe';
import { ResetPasswordValidationPipe } from '../validation/reset-password.validation.pipe';
import { VerifyResetOtpValidationPipe } from '../validation/verify-reset-otp.validation.pipe';
import { Response } from "express";
import {RefreshTokenGuard} from "@Package/auth/guards";
import {RefreshPayload} from "@Package/api/decorators/refresh-payload.decorator";
import {RedisKeys} from "../../../../common/redis.constant";

@ControllerWeb({prefix: "auth"})
export class AuthController {
   constructor(
      private readonly authService: AuthService,
   ){}

   @Post('sign-in')
   async signIn(@Body(SingInValidationPipe) signInInfo: SingInDto) {
      return await this.authService.signIn(signInInfo);
   }

   @Post('log-in')
   async logIn(@Body(LogInValidationPipe) logInInfo: LogInDto, @Res({passthrough: true}) res: Response ) {
      const tokens = await this.authService.logIn(logInInfo);
      res.cookie(RedisKeys.REFRESH_TOKEN, tokens.refreshToken, {httpOnly: true});
      return {
         accessToken: tokens.refreshToken
      }
   }

   @Post('request-password-reset')
   async requestPasswordReset(@Body(RequestPasswordResetValidationPipe) body: { email: string }) {
      return await this.authService.requestPasswordReset(body.email);
   }
}

@AuthControllerWeb({prefix: "auth"})
export class AuthControllerWithToken {
   constructor(
      private readonly authService: AuthService,
   ){}

   @Post('verify-otp')
   async verifyOtp(@User() user: UserPayload, @Body() body: { otp: string }) {
      return await this.authService.verifyOtp(user.email, body.otp);
   }

   @Post('verify-reset-otp')
   async verifyResetOtp(@User() user: UserPayload, @Body(VerifyResetOtpValidationPipe) body: { otp: string }) {
      return this.authService.verifyResetOtp(user.email, body.otp);
   }

   @Post('reset-password')
   async resetPassword(
      @User() user: UserPayload,
      @Body(ResetPasswordValidationPipe) body: { 
         otp: string; 
         newPassword: string;
      }
   ) {
      return await this.authService.resetPassword(user.email, body.newPassword);
   }

   @Post("logout")
   async  logout(@Body() user: UserPayload, @Res() res: Response) {

   }
}

@UseGuards(RefreshTokenGuard)
@ControllerWeb({
   prefix: "auth"
})
export class RefreshController {
   constructor(
      private readonly authService: AuthService,
   ){}

   @Post('refresh')
   async refreshToken(@RefreshPayload() payload: IRefreshToken, @Res({passthrough: true}) res: Response) {
      const tokens = await this.authService.refreshToken(payload, res)
      res.cookie(RedisKeys.REFRESH_TOKEN, tokens.refreshToken, {httpOnly: true});
      return {
         accessToken: tokens.accessToken
      }
   }

   @Post("log-out")
   async logout(@RefreshPayload() payload: IRefreshToken, @Res({passthrough: true}) res: Response){
      await this.authService.logOut(payload, res)
      res.clearCookie(RedisKeys.REFRESH_TOKEN);
      return;
   }
}

