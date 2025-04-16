import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../../services/auth.service';
import { SingInDto } from '../dto/request/singIn.dto';
import { LogInValidationPipe } from '../validation/log-in.validation.pipe';
import { LogInDto } from '../dto/request/logIn.dto';
import { SingInValidationPipe } from '../validation/sing-in.validation.pipe';

@Controller('website/auth')
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
}
