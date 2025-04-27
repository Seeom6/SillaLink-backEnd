import { IError } from '@Package/error/error.interface';
import { Injectable } from '@nestjs/common';
import { AppError } from '@Package/error/app.error';
import { CodeErrors } from '@Modules/shared';
import { IServiceError } from '@Package/error/service.error.interface';
import { ErrorFactory } from '@Package/error';
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
export class AuthError implements IServiceError {

  public readonly errorType = 'AUTH_ERROR';

  throw(code: AuthErrorCode, context?: any): never {
    const message = AuthErrorMessages[code] || 'Unknown auth error';
    throw ErrorFactory.createError({
      code,
      message,
      errorType: this.errorType,
    });
  }

}