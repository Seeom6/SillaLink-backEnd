import { Injectable } from '@nestjs/common';
import { ErrorFactory } from '@Package/error';
import { IServiceError } from '@Package/error/service.error.interface';

export enum OurServiceErrorCode {
    SERVICE_NOT_FOUND = 3001,
    SERVICE_ALREADY_EXISTS = 3002,
}

const OurServiceErrorMessages = {
    [OurServiceErrorCode.SERVICE_NOT_FOUND]: 'Service not found',
    [OurServiceErrorCode.SERVICE_ALREADY_EXISTS]: 'Service already exists',
};

@Injectable()
export class OurServiceError implements IServiceError {

    public readonly errorType = 'OUR_SERVICE_ERROR';

    throw(code: OurServiceErrorCode, context?: any): never {
        const message = OurServiceErrorMessages[code] || 'Unknown service error';
        throw ErrorFactory.createError({
            code,
            message,
            errorType: this.errorType,
        });
    }
}