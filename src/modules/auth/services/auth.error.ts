import { IError } from '@Package/error/error.interface';
import { Injectable } from '@nestjs/common';
import { AppError } from '@Package/error/app.error';
import { CodeErrors } from '@Modules/shared';

export enum AuthErrorCode {
  USER_ALREADY_EXISTS = CodeErrors.USER_ALREADY_IN_USE,
  OTP_EXPIRED = 4001,
  INVALID_OTP = 4002,
  OTP_VERIFICATION_FAILED = CodeErrors.SERVER_ERROR,
  INVALID_CREDENTIALS = 4003,
  INVALID_RESET_TOKEN = 4004,
}

export const AuthErrorMessages = {
  [AuthErrorCode.USER_ALREADY_EXISTS]: 'User already exists',
  [AuthErrorCode.OTP_EXPIRED]: 'OTP expired or not found',
  [AuthErrorCode.INVALID_OTP]: 'Invalid OTP',
  [AuthErrorCode.OTP_VERIFICATION_FAILED]: 'Failed to verify OTP',
  [AuthErrorCode.INVALID_CREDENTIALS]: 'Invalid credentials',
  [AuthErrorCode.INVALID_RESET_TOKEN]: 'Invalid or expired password reset token',
};

@Injectable()
export class AuthError {
  private createError(code: AuthErrorCode): IError {
    return {
      code,
      message: AuthErrorMessages[code],
    };
  }

  userAlreadyExist(): never {
    throw new AppError(this.createError(AuthErrorCode.USER_ALREADY_EXISTS));
  }

  otpExpiredOrNotFound(): never {
    throw new AppError(this.createError(AuthErrorCode.OTP_EXPIRED));
  }

  invalidOtp(): never {
    throw new AppError(this.createError(AuthErrorCode.INVALID_OTP));
  }

  otpVerificationFailed(): never {
    throw new AppError(this.createError(AuthErrorCode.OTP_VERIFICATION_FAILED));
  }

  invalidCredentials(): never {
    throw new AppError(this.createError(AuthErrorCode.INVALID_CREDENTIALS));
  }

  invalidResetToken(): never {
    throw new AppError(this.createError(AuthErrorCode.INVALID_RESET_TOKEN));
  }
}