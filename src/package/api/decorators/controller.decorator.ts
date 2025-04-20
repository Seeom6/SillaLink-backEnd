import {applyDecorators, Controller, UseGuards, UseInterceptors} from '@nestjs/common';
import { JwtAuthGuard } from '@Package/auth';
import { PathPrefixEnum } from "@Package/shared";
import { ResponseInterceptor } from "@Package/api";

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