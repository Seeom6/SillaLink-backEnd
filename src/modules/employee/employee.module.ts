import { Module } from "@nestjs/common";
import { EmployeeAdminController } from "./api/controllers/employee.admin.controller";
import { EmployeeService } from "./services/employee.service";
import { EmployeeError } from "./services/employee.error";
import { UserModule } from "@Modules/user";


@Module({
    imports: [UserModule],
    controllers: [EmployeeAdminController],
    providers: [EmployeeService, EmployeeError]
})
export class EmployeeModule{}