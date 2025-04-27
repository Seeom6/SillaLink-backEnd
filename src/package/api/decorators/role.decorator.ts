import { applyDecorators } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import {UserTypesMetadata} from "@Package/api";
import {UserTypesGuard} from "@Package/auth/guards/permission.guard";

export function AllowRole(...values: string[]) {
  return applyDecorators(
    UserTypesMetadata(values),
    UseGuards(UserTypesGuard),
  );
}
