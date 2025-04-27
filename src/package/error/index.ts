import { GlobalFilter } from '@Package/error/exceptions/global.filter';
import { HttpExceptionFilter } from '@Package/error/exceptions/http-exception.filter';
import { AppExceptionFilter } from '@Package/error/exceptions/app-exception.filter';
import { ExceptionFilter } from '@nestjs/common';
import { ZodExceptionFilter } from './exceptions/zod-exception.filter';
import { MongoExceptionFilter } from './exceptions/mongo-server.filter';

export * from "./app.error"
export * from "./exceptions/app-exception.filter"
export * from "./error.interface"
export * from "./exceptions/global.filter"
export * from "./error.factory"
export * from "./service.error.interface"
export const ExceptionFilters: ExceptionFilter[] = [
    new GlobalFilter(),
    new HttpExceptionFilter(),
    new MongoExceptionFilter(),
    new AppExceptionFilter(),
    new ZodExceptionFilter(),
];