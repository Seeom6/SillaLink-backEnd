import { IError } from '@Package/error/error.interface';
import { Injectable } from '@nestjs/common';
import { ErrorFactory } from '@Package/error';
import { IServiceError } from '@Package/error/service.error.interface';

export enum ProjectErrorCode {
  PROJECT_NOT_FOUND = 5001,
  PROJECT_ALREADY_EXISTS = 5002,
  INVALID_PROJECT_DATA = 5003,
  UNAUTHORIZED_ACCESS = 5004,
  MEMBER_ALREADY_EXISTS = 5005,
  MEMBER_NOT_FOUND = 5006,
}

export const ProjectErrorMessages = {
  [ProjectErrorCode.PROJECT_NOT_FOUND]: 'Project not found',
  [ProjectErrorCode.PROJECT_ALREADY_EXISTS]: 'Project with this name already exists',
  [ProjectErrorCode.INVALID_PROJECT_DATA]: 'Invalid project data',
  [ProjectErrorCode.UNAUTHORIZED_ACCESS]: 'Unauthorized access to project',
  [ProjectErrorCode.MEMBER_ALREADY_EXISTS]: 'Member already exists in project',
  [ProjectErrorCode.MEMBER_NOT_FOUND]: 'Member not found in project',
};

@Injectable()
export class ProjectError implements IServiceError {

  public readonly errorType = 'PROJECT_ERROR';

  throw(code: ProjectErrorCode, context?: any): never {
    const message = ProjectErrorMessages[code] || 'Unknown project error';
    throw ErrorFactory.createError({
      code,
      message,
      errorType: this.errorType,
    });
  }
} 