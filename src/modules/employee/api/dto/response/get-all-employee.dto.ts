import {UserDocument} from "@Modules/user";
import {PositionEnum} from "@Modules/employee/databases/position.enum";

export class GetAllEmployeeDto {
  fistName: string;
  lastName: string;
  email: string;
  position: PositionEnum;
  image: string;
  startDate: Date;
  endDate: Date;
  id: string;
  constructor(users: UserDocument) {
    this.fistName = users.firstName
    this.lastName = users.lastName
    this.email = users.email
    this.position = users.employee.position as PositionEnum;
    this.image = users.employee.image
    this.startDate = users.employee.startDate
    this.endDate = users.employee.endDate ?? null
    this.id = users._id.toString() ;
  }
}