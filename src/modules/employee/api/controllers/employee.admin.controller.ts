import {Body, Get, Post, Query} from '@nestjs/common';
import {AuthControllerAdmin, parseQuery, Pagination} from 'src/package/api';
import { EmployeeService } from '@Modules/employee/services/employee.service';
import { CreateEmployeeValidation } from '../validation/create-employee.validation';
import { CreateEmployee } from '../dto/requests/create-employee.dto';
import { GetAllEmployee } from '../dto/requests/get-all-employee.dto';
import {GetAllEmployeeDto} from "@Modules/employee/api/dto/response/get-all-employee.dto";

@AuthControllerAdmin({
    prefix: 'employee',
})
export class EmployeeAdminController {

    constructor(
        private readonly employeeService: EmployeeService
    ) {}

    @Post("")
    async create(
        @Body(CreateEmployeeValidation) body: CreateEmployee,
    ){
        return await this.employeeService.create(body)
    }

    @Get("")
    async getAll(
        @Query() query: GetAllEmployee
    ){
        const {pagination, myQuery} = parseQuery(query)
        const employee = await this.employeeService.getAll(query, pagination)
        return employee.map(p => new GetAllEmployeeDto(p))
    }
}
