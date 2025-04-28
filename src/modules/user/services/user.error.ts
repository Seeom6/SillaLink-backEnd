import { Injectable } from '@nestjs/common';
import { ErrorFactory } from '@Package/error';
import { IServiceError } from '@Package/error/service.error.interface';

export enum UserErrorCode {
    USER_NOT_FOUND = 2001,
    USER_ALREADY_EXISTS = 2002,
}

export const UserErrorMessages = {
    [UserErrorCode.USER_NOT_FOUND]: 'User not found',
    [UserErrorCode.USER_ALREADY_EXISTS]: 'User already exists',
};

@Injectable()
export class UserError implements IServiceError {

    public readonly errorType = 'USER_ERROR';

    throw(code: UserErrorCode, context?: any): never {
        const message = UserErrorMessages[code] || 'Unknown User error';
        throw ErrorFactory.createError({
            code,
            message,
            errorType: this.errorType,
        });
    }
} 