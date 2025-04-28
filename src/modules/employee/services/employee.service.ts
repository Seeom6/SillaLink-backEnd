import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../user/entity/user.repository";
import { EmployeeError, EmployeeErrorCode } from "./employee.error";
import { CreateEmployee } from "../api/dto/requests/create-employee.dto";
import { HashService } from "@Package/auth";
import { UserRole } from "@Modules/user";
import { GetAllEmployee } from "@Modules/employee/api/dto/requests/get-all-employee.dto";
import { Pagination, QueryValue } from "@Package/api";


@Injectable()
export class EmployeeService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly employeeError: EmployeeError,
    ){}

    async create(body: CreateEmployee){
        const employee = await this.userRepository.findOne({
            filter: {
                email: body.email
            }
        })
        if(employee){
            this.employeeError.throw(EmployeeErrorCode.EMPLOYEE_ALREADY_EXISTS)
        }
        const hashedPassword = await HashService.hashPassword(body.password);
        await this.userRepository.create({
            doc: {
                email: body.email,
                employee: {
                    startDate: new Date(),
                    position: body.position,
                    image: body.image
                },
                firstName: body.firstName,
                lastName: body.lastName,
                password: hashedPassword,
                isActive: true,
                role: UserRole.EMPLOYEE,
            }
        })
        
    }


    async getAll(query: QueryValue<GetAllEmployee>, pagination: Pagination){
        const filter = {
            role: UserRole.EMPLOYEE,
            // ...query
        }
        const employee = await this.userRepository.find({
            filter: {
                role:  UserRole.EMPLOYEE,
            },
            // options: {
            //     ...pagination
            // }
        })
        return employee
    }
}