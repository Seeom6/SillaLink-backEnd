import { AuthAdminService } from "@Modules/auth/services/auth.admin.service";
import { Body, Post } from "@nestjs/common";
import { AuthControllerAdmin, ControllerAdmin } from "@Package/api";
import { LogInDto } from "../dto/request/logIn.dto";

@ControllerAdmin({
    prefix: "auth"
})
export class AuthAdminController {
    constructor(private readonly authAdminService: AuthAdminService) { }
    @Post("login")
    login(@Body() body: LogInDto) {
        return this.authAdminService.login(body);
    }
}