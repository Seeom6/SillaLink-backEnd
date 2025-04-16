import { IUser } from "@Modules/user";

export class SingInDto implements IUser {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  isActive?: boolean;
}