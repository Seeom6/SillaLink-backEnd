import { GlobalFilter } from '@Package/error/exceptions/global.filter';
import { HttpExceptionFilter } from '@Package/error/exceptions/http-exception.filter';
import { AppExceptionFilter } from '@Package/error/exceptions/app-exception.filter';
import { ExceptionFilter } from '@nestjs/common';
import { ZodExceptionFilter } from './exceptions/zod-exception.filter';

export * from "./app.error"
export * from "./exceptions/app-exception.filter"
export * from "./error.interface"
export * from "./exceptions/global.filter"

export const ExceptionFilters: ExceptionFilter[] = [
    new GlobalFilter(),
    new HttpExceptionFilter(),
    new AppExceptionFilter(), 
    new ZodExceptionFilter()
];