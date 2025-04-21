import { Body, Post } from '@nestjs/common';
import { AuthService } from '@Modules/auth';
import { SingInDto } from '../dto/request/singIn.dto';
import { LogInValidationPipe } from '../validation/log-in.validation.pipe';
import { LogInDto } from '../dto/request/logIn.dto';
import { SingInValidationPipe } from '../validation/sing-in.validation.pipe';
import { ControllerWeb, AuthControllerWeb, User } from "@Package/api";
import { UserPayload } from '@Package/auth';
import { RequestPasswordResetValidationPipe } from '../validation/request-password-reset.validation.pipe';
import { ResetPasswordValidationPipe } from '../validation/reset-password.validation.pipe';

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
   async logIn(@Body(LogInValidationPipe) logInInfo: LogInDto) {
      return await this.authService.logIn(logInInfo);
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

   @Post('reset-password')
   async resetPassword(@User() user: UserPayload, @Body(ResetPasswordValidationPipe) body: { newPassword: string }) {
      return await this.authService.resetPassword(user.email, body.newPassword);
   }
}

