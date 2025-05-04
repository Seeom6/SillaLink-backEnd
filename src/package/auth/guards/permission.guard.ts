import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import {CHECK_TYPES_KEY} from "src/package/api";
import {CodeErrors} from "@Modules/shared";

@Injectable()
export class UserTypesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const typeHandlers = this.reflector.get<{
      values: string[];
    }>(CHECK_TYPES_KEY, context.getHandler());

    const { user } = context.switchToHttp().getRequest();

    if (!typeHandlers.values.includes(user.type))
      throw new HttpException(
        { error: CodeErrors.VALIDATION_ERROR },
        HttpStatus.UNAUTHORIZED,
      );

    return true;
  }
}
