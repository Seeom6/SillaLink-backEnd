import { IUser } from '../../../types/user.interface';

export class CreateUserDto implements IUser {
   email: string;
   password: string;
   firstName?: string;
   lastName?: string;
   isActive?: boolean;
}