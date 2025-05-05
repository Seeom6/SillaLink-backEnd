import { Injectable } from '@nestjs/common';
import { ErrorFactory } from '@Package/error';
import { IServiceError } from '@Package/error/service.error.interface';
import {ErrorCode} from "../../../common/error/error-code";

const OurServiceErrorMessages = {
    [ErrorCode.SERVICE_NOT_FOUND]: 'Service not found',
    [ErrorCode.SERVICE_ALREADY_EXISTS]: 'Service already exists',
};

@Injectable()
export class OurServiceError implements IServiceError {

    public readonly errorType = 'OUR_SERVICE_ERROR';

    throw(code: ErrorCode, context?: any): never {
        const message = OurServiceErrorMessages[code] || 'Unknown service error';
        throw ErrorFactory.createError({
            code,
            message,
            errorType: this.errorType,
        });
    }
}