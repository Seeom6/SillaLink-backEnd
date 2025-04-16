import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EnvironmentService } from '@Package/config';
import { HashService, UserPayload } from '@Package/auth';

import { SingInDto } from '../api/dto/request/singIn.dto';
import { LogInDto } from '../api/dto/request/logIn.dto';
import {User, UserDocument, UserService} from '@Modules/user';
import { AuthError } from './auth.error';

@Injectable()
export class AuthService {
   constructor(
      private readonly jwtService: JwtService,
      private readonly userService: UserService,
      private readonly env: EnvironmentService,
      private readonly authError: AuthError,
   ){}

   public async signIn(userSignInInfo: SingInDto) {
      const isExist = await this.userService.findUserByEmail(userSignInInfo.email, false);
      if(isExist) {
         this.authError.userAlreadyExist();
      }

      const hashedPassword = await HashService.hashPassword(userSignInInfo.password);
      const user: UserDocument = await this.userService.createUser({
         ...userSignInInfo,
         password: hashedPassword
      });

      const userPayload: UserPayload = {
         email: user.email,
         id: user.id,
         firstName: user.firstName,
         lastName: user.lastName
      };

      return {
         access_token: this.jwtService.sign(userPayload),
         user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
         }
      };
   }

   async logIn(logInInfo: LogInDto) {
      const user = await this.userService.findUserByEmail(logInInfo.email, false);
      
      if(!user) {
         throw new UnauthorizedException('Invalid credentials');
      }

      const isPasswordValid = await HashService.comparePassword(
         logInInfo.password,
         user.password
      );

      if(!isPasswordValid) {
         throw new UnauthorizedException('Invalid credentials');
      }

      const userPayload: UserPayload = {
         email: user.email,
         id: user.id,
         firstName: user.firstName,
         lastName: user.lastName
      };

      return {
         access_token: this.jwtService.sign(userPayload),
         user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
         }
      };
   }
}
