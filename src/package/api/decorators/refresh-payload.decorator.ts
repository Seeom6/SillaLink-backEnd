import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import {IRefreshToken} from "@Package/auth";

export const RefreshPayload = createParamDecorator((data: any, context:  ExecutionContext): IRefreshToken=>{
  const req = context.switchToHttp().getRequest();
  return req["refresh"] ?? null
})