import { Injectable } from '@nestjs/common';
import { ErrorFactory } from '@Package/error';
import { IServiceError } from '@Package/error/service.error.interface';

export enum EmployeeErrorCode {
    EMPLOYEE_NOT_FOUND = 2001,
    EMPLOYEE_ALREADY_EXISTS = 2002,
}

export const EmployeeErrorMessages = {
    [EmployeeErrorCode.EMPLOYEE_NOT_FOUND]: 'Employee not found',
    [EmployeeErrorCode.EMPLOYEE_ALREADY_EXISTS]: 'Employee already exists',
};

@Injectable()
export class EmployeeError implements IServiceError {

    public readonly errorType = 'Employee_ERROR';

    throw(code: EmployeeErrorCode, context?: any): never {
        const message = EmployeeErrorMessages[code] || 'Unknown Employee error';
        throw ErrorFactory.createError({
            code,
            message,
            errorType: this.errorType,
        });
    }
} 