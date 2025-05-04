import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Connection } from 'mongoose';

import { EnvironmentService } from '@Package/config';
import { HashService, UserPayload } from 'src/package/auth';
import { RedisService } from '@Package/cache/redis/redis.service';
import { generateOTP, MailService } from '@Package/services';
import { AppError } from '@Package/error/app.error';
import { SingInDto } from '../api/dto/request/singIn.dto';
import { LogInDto } from '../api/dto/request/logIn.dto';
import { UserService} from '@Modules/user';
import { AuthError, AuthErrorCode } from './auth.error';

@Injectable()
export class AuthService {
   constructor(
      private readonly jwtService: JwtService,
      private readonly userService: UserService,
      private readonly authError: AuthError,
      private readonly redisService: RedisService,
      private readonly mailService: MailService,
      @InjectConnection() private readonly connection: Connection
   ){}


   public async signIn(userSignInInfo: SingInDto) {
      const isExist = await this.userService.findUserByEmail(userSignInInfo.email, false);
      if(isExist) {
         this.authError.throw(AuthErrorCode.USER_ALREADY_EXISTS);
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
            role: user.role
         };
   
         token = this.jwtService.sign(userPayload);
         const otp = generateOTP();
   
         await this.redisService.set(`otp:${user.email}`, otp, 30000000); 
   
         await this.mailService.sendSingInOTP(user.email, otp);
         console.log("OTP has been sent to your email")
      })

      return {
         access_token: token,
         message: 'OTP has been sent to your email'
      };
   }

   async logIn(logInInfo: LogInDto) {
      const user = await this.userService.findUserByEmail(logInInfo.email, false);
      
      if(!user) {
         this.authError.throw(AuthErrorCode.INVALID_CREDENTIALS);
      }

      const isPasswordValid = await HashService.comparePassword(
         logInInfo.password,
         user.password
      );

      if(!isPasswordValid) {
         this.authError.throw(AuthErrorCode.INVALID_CREDENTIALS);
      }

      const userPayload: UserPayload = {
         email: user.email,
         id: user.id,
         role: user.role
      };

      const accessToken = this.jwtService.sign(userPayload);

      return {
         access_token: accessToken,
         user: {
            id: user.id,
            email: user.email,
            role: user.role
         },
         message: 'OTP has been sent to your email'
      };
   }

   async verifyOtp(email: string, otp: string): Promise<{ message: string }> {
      try {    
         const storedOtp = await this.redisService.get<string>(`otp:${email}`);
         if (!storedOtp) {
            this.authError.throw(AuthErrorCode.OTP_EXPIRED);
         }

         if (storedOtp !== otp) {
            this.authError.throw(AuthErrorCode.INVALID_OTP);
         }

         await this.redisService.delete(`otp:${email}`);
         await this.userService.updateUserByEmail(email, { isActive: true });

         return { message: 'OTP verified successfully' };
      } catch (error) {
         if (error instanceof AppError) {
            throw error;
         }
         this.authError.throw(AuthErrorCode.OTP_VERIFICATION_FAILED);
      }
   }

   async requestPasswordReset(email: string): Promise<{ message: string; token: string }> {
      const user = await this.userService.findUserByEmail(email, false);
      if (!user) {
         // Don't reveal if user exists or not
         return { 
            message: 'If an account exists with this email, you will receive a password reset email',
            token: ''
         };
      }

      const token = this.jwtService.sign(
         { email, type: 'password_reset' },
         { expiresIn: '15m' }
      );

      await this.redisService.set(`reset_token:${email}`, token, 900); // 15 minutes
      await this.mailService.sendPasswordResetEmail(email, token);

      return { 
         message: 'If an account exists with this email, you will receive a password reset email',
         token
      };
   }

   async verifyResetOtp(email: string, otp: string): Promise<{ message: string; token: string }> {
      try {
         const storedOtp = await this.redisService.get<string>(`reset:${email}`);
         if (!storedOtp) {
            this.authError.throw(AuthErrorCode.OTP_EXPIRED);
         }

         if (storedOtp !== otp) {
            this.authError.throw(AuthErrorCode.INVALID_OTP);
         }

         // Generate a reset token that will be used to reset the password
         const resetToken = this.jwtService.sign(
            { email, type: 'password_reset' },
            { expiresIn: '15m' }
         );

         await this.redisService.delete(`reset:${email}`);
         await this.redisService.set(`reset_token:${email}`, resetToken, 90000000); // 15 minutes

         return { 
            message: 'OTP verified successfully', 
            token: resetToken 
         };
      } catch (error) {
         if (error instanceof AppError) {
            throw error;
         }
         this.authError.throw(AuthErrorCode.OTP_VERIFICATION_FAILED);
      }
   }

   async resetPassword(email: string, newPassword: string): Promise<{ message: string }> {
      try {
         const hashedPassword = await HashService.hashPassword(newPassword);
         await this.userService.updateUserByEmail(email, { password: hashedPassword });
         return { message: 'Password has been reset successfully' };
      } catch (error) {
         if (error instanceof AppError) {
            throw error;
         }
         this.authError.throw(AuthErrorCode.OTP_VERIFICATION_FAILED);
      }
   }
}
