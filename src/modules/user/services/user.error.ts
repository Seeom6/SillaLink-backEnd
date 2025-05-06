import { Injectable } from '@nestjs/common';
import { ErrorFactory } from '@Package/error';
import { IServiceError } from '@Package/error/service.error.interface';
import {ErrorCode} from "../../../common/error/error-code";

export const UserErrorMessages = {
    [ErrorCode.USER_NOT_FOUND]: 'User not found',
    [ErrorCode.USER_ALREADY_EXISTS]: 'User already exists',
};

@Injectable()
export class UserError implements IServiceError {

    public readonly errorType = 'USER_ERROR';

    throw(code: ErrorCode, context?: any): never {
        const message = UserErrorMessages[code] || 'Unknown User error';
        throw ErrorFactory.createError({
            code,
            message,
            errorType: this.errorType,
        });
    }
} 