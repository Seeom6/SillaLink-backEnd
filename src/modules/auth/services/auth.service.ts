import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EnvironmentService } from '@Package/config';
import { HashService, UserPayload } from '@Package/auth';
import { RedisService } from '@Package/cache/redis/redis.service';
import { generateOTP, MailService } from '@Package/services';

import { SingInDto } from '../api/dto/request/singIn.dto';
import { LogInDto } from '../api/dto/request/logIn.dto';
import {User, UserDocument, UserService} from '@Modules/user';
import { AuthError } from './auth.error';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class AuthService {
   constructor(
      private readonly jwtService: JwtService,
      private readonly userService: UserService,
      private readonly env: EnvironmentService,
      private readonly authError: AuthError,
      private readonly redisService: RedisService,
      private readonly mailService: MailService,
      @InjectConnection() private readonly connection: Connection
   ){}


   public async signIn(userSignInInfo: SingInDto) {
      const isExist = await this.userService.findUserByEmail(userSignInInfo.email, false);
      if(isExist) {
         this.authError.userAlreadyExist();
      }
      let token: string;
      const session = await this.connection.startSession()
      await session.withTransaction(async(session)=>{
         const hashedPassword = await HashService.hashPassword(userSignInInfo.password);
         const user = await this.userService.createUser({
            ...userSignInInfo,
            password: hashedPassword
         },
      {
         session
      });
   
         const userPayload: UserPayload = {
            email: user.email,
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName
         };
   
         token = this.jwtService.sign(userPayload);
         const otp = generateOTP();
   
         await this.redisService.set(token, otp, 300); 
   
         await this.mailService.sendSingInOTP(user.email, otp);
      })

      return {
         access_token: token,
         message: 'OTP has been sent to your email'
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

      const accessToken = this.jwtService.sign(userPayload);

      return {
         access_token: accessToken,
         user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
         },
         message: 'OTP has been sent to your email'
      };
   }
}
