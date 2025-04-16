import { IError } from '@Package/error/error.interface';
import { Injectable } from '@nestjs/common';
import { AppError } from '@Package/error/app.error';
import { CodeErrors } from '@Modules/shared';

@Injectable()
export class AuthError {
  private userAlreadyExists: IError = {
    message: "user Already Exist",
    code: CodeErrors.USER_ALREADY_IN_USE,
}

  userAlreadyExist(){
    throw new AppError(this.userAlreadyExists)
  }
}