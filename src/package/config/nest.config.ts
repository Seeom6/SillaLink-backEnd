import { NestExpressApplication } from "@nestjs/platform-express";
import { rateLimit } from "express-rate-limit";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { EnvironmentService } from "@Package/config";
export const nestConfig = (app: NestExpressApplication) => {
    const configService = app.get(EnvironmentService);
    app.enableCors({
        origin: "*",
        credentials: true,
    });
    app.use(rateLimit({
        windowMs: 15 * 60 * 1000,
        limit: 100,
    }));
    app.use(morgan("dev"))
    app.use(cookieParser())
    app.setGlobalPrefix(`api/${configService.get("app.version")}`)
}