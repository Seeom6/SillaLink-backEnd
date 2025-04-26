import { IError } from '@Package/error/error.interface';
import { Injectable } from '@nestjs/common';
import { AppError } from '@Package/error/app.error';
import { CodeErrors } from '@Modules/shared';

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
export class ProjectError {
  private createError(code: ProjectErrorCode): IError {
    return {
      code,
      message: ProjectErrorMessages[code],
    };
  }

  projectNotFound(): never {
    throw new AppError(this.createError(ProjectErrorCode.PROJECT_NOT_FOUND));
  }

  projectAlreadyExists(): never {
    throw new AppError(this.createError(ProjectErrorCode.PROJECT_ALREADY_EXISTS));
  }

  invalidProjectData(): never {
    throw new AppError(this.createError(ProjectErrorCode.INVALID_PROJECT_DATA));
  }

  unauthorizedAccess(): never {
    throw new AppError(this.createError(ProjectErrorCode.UNAUTHORIZED_ACCESS));
  }

  memberAlreadyExists(): never {
    throw new AppError(this.createError(ProjectErrorCode.MEMBER_ALREADY_EXISTS));
  }

  memberNotFound(): never {
    throw new AppError(this.createError(ProjectErrorCode.MEMBER_NOT_FOUND));
  }
} 