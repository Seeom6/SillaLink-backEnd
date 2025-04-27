import { IError, IResponseError } from '@Package/error/error.interface';

export class AppError implements IError {
  public readonly code: number;
  public readonly message: string;
  public readonly errorType: string;

  constructor(error: IError) {
    this.code = error.code;
    this.message = error.message as string;
    this.errorType = error.errorType;
  }
}
