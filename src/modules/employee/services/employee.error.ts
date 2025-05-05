import { Injectable } from '@nestjs/common';
import { ErrorFactory } from '@Package/error';
import { IServiceError } from '@Package/error/service.error.interface';
import {ErrorCode} from "../../../common/error/error-code";

const EmployeeErrorMessages = {
    [ErrorCode.EMPLOYEE_NOT_FOUND]: 'Employee not found',
    [ErrorCode.EMPLOYEE_ALREADY_EXISTS]: 'Employee already exists',
};

@Injectable()
export class EmployeeError implements IServiceError {

    public readonly errorType = 'Employee_ERROR';

    throw(code: ErrorCode, context?: any): never {
        const message = EmployeeErrorMessages[code] || 'Unknown Employee error';
        throw ErrorFactory.createError({
            code,
            message,
            errorType: this.errorType,
        });
    }
} 