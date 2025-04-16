import { IError, IResponseError } from '@Package/error/error.interface';

export class AppError implements IError {
  code: number;
  message: string;
  constructor(error: IError) {
    this.code = error.code;
    this.message = error.message as string;
  }
}
