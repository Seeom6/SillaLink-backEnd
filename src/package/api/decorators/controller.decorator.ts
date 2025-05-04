import {applyDecorators, Controller, UseGuards, UseInterceptors} from '@nestjs/common';
import { JwtAuthGuard } from 'src/package/auth';
import { ResponseInterceptor } from "src/package/api";
import { PathPrefixEnum } from '../enum';

export function AuthControllerWeb(options: { prefix: string }){
  return applyDecorators(
    Controller({path: `${PathPrefixEnum.WEB}/${options.prefix}`}),
    UseGuards(JwtAuthGuard),
    UseInterceptors(ResponseInterceptor)
  )
}

export function ControllerWeb(options: { prefix: string }){
  return applyDecorators(
    Controller({path: `${PathPrefixEnum.WEB}/${options.prefix}`}),
    UseInterceptors(ResponseInterceptor)
  )
}

export function AuthControllerAdmin(options: { prefix: string }){
  return applyDecorators(
    Controller({path: `${PathPrefixEnum.ADMIN}/${options.prefix}`}),
    UseGuards(JwtAuthGuard),
    UseInterceptors(ResponseInterceptor)
  )
}

export function ControllerAdmin(options: { prefix: string }){
  return applyDecorators(
    Controller({path: `${PathPrefixEnum.ADMIN}/${options.prefix}`}),
    UseInterceptors(ResponseInterceptor)
  )
}