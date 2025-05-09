import {InjectConnection} from "@nestjs/mongoose";
import {LogInDto} from "../api/dto/request/logIn.dto";
import {Injectable} from "@nestjs/common";
import {Connection} from "mongoose";
import {MailService} from "@Package/services/email/email.service";
import {RedisService} from "@Package/cache";
import {AuthError} from "./auth.error";
import {UserRole, UserService} from "@Modules/user";
import {JwtService} from "@nestjs/jwt";
import {HashService, UserPayload} from "src/package/auth";
import {ErrorCode} from "../../../common/error/error-code";

@Injectable()
export class AuthAdminService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly authError: AuthError,
        private readonly redisService: RedisService,
        private readonly mailService: MailService,
        @InjectConnection() private readonly connection: Connection
    ) { }

    async login(body: LogInDto) {
        const user = await this.userService.findUserByEmail(body.email, false);
        if (!user) {
            this.authError.throw(ErrorCode.INVALID_CREDENTIALS);
        }

        if (user.role !== UserRole.ADMIN) {
            this.authError.throw(ErrorCode.INVALID_CREDENTIALS);
        }

        // const isPasswordValid = await HashService.comparePassword(
        //     body.password,
        //     user.password
        // );
        // if (!isPasswordValid) {
        //     this.authError.throw(ErrorCode.INVALID_CREDENTIALS);
        // }

        const userPayload: UserPayload = {
            email: user.email,
            id: user.id,
            role: user.role
        };

        const accessToken = this.jwtService.sign(userPayload);

        return {
            access_token: accessToken,
        };
    }
}