import { PositionEnum } from "@Modules/employee/databases/position.enum";
import { CreateUserDto } from "@Modules/user/api/dto/request/create-user.dto";

export class CreateEmployee extends CreateUserDto {
    position: PositionEnum;
    image: string;
}