import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger, NotFoundException } from '@nestjs/common';
import { Response, Request } from 'express';
import { IResponseError } from '@Package/error';
import { ZodError } from 'zod';
import {CodeErrors} from "@Modules/shared";

@Catch(ZodError)
export class ZodExceptionFilter implements ExceptionFilter{
  catch(exception: ZodError, host: ArgumentsHost): any {
    const response: Response = host.switchToHttp().getResponse();
    const request: Request = host.switchToHttp().getRequest();
    const logger = new Logger(ZodError.name, {timestamp: false})
    logger.error(exception.issues)
    let error: IResponseError = {
      path: request.path,
      time: new Date(),
      message: exception.issues[0],
      code: CodeErrors.VALIDATION_ERROR,
    }
    return response.status(400).json({
      error: error,
    });
  }
}
