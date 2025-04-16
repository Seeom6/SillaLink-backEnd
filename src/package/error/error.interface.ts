
export interface IError {
  message: string | object;
  code: number;
}

export interface IResponseError extends IError {
  path: string;
  time: Date;
}
