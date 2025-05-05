import { Injectable } from '@nestjs/common';
import { IServiceError } from '@Package/error/service.error.interface';
import { ErrorFactory } from '@Package/error';
import {ErrorCode} from "../../../common/error/error-code";

export const AuthErrorMessages = {
  [ErrorCode.USER_ALREADY_EXISTS]: 'User already exists',
  [ErrorCode.OTP_EXPIRED]: 'OTP expired or not found',
  [ErrorCode.INVALID_OTP]: 'Invalid OTP',
  [ErrorCode.OTP_VERIFICATION_FAILED]: 'Failed to verify OTP',
  [ErrorCode.INVALID_CREDENTIALS]: 'Invalid credentials',
  [ErrorCode.INVALID_RESET_TOKEN]: 'Invalid or expired password reset token',
};

@Injectable()
export class AuthError implements IServiceError {

  public readonly errorType = 'AUTH_ERROR';

  throw(code: ErrorCode, context?: any): never {
    const message = AuthErrorMessages[code] || 'Unknown auth error';
    throw ErrorFactory.createError({
      code,
      message,
      errorType: this.errorType,
    });
  }

}