import { ArgumentsHost, Catch, ExceptionFilter, HttpException, NotFoundException } from '@nestjs/common';
import { Response, Request } from 'express';
import { IResponseError } from '@Package/error';
import { MongoServerError } from 'mongodb';
@Catch(MongoServerError)
export class HttpExceptionFilter implements ExceptionFilter{
  catch(exception: MongoServerError, host: ArgumentsHost): any {
    const response: Response = host.switchToHttp().getResponse();
    const request: Request = host.switchToHttp().getRequest();
    console.log(exception.message);
    let error: IResponseError = {
      path: request.path,
      time: new Date(),
      message: exception.message,
      code: exception.errorResponse.code as number,
    }
    return response.status(400).json({
      error: error,
    });
  }
}
