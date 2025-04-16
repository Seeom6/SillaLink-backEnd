import { ArgumentsHost, Catch, ExceptionFilter, HttpException, NotFoundException } from '@nestjs/common';
import { Response, Request } from 'express';
import { AppError } from '@Package/error/app.error';
import { IResponseError } from '@Package/error';

@Catch(AppError)
export class AppExceptionFilter implements ExceptionFilter{
  catch(exception: AppError, host: ArgumentsHost): any {
    const response: Response = host.switchToHttp().getResponse();
    const request: Request = host.switchToHttp().getRequest();
    console.log(exception.message);
    let error: IResponseError = {
      path: request.path,
      time: new Date(),
      message: exception.message,
      code: exception.code,
    }
    return response.status(400).json({
      error: error,
    });
  }
}
