import { Global, Module } from "@nestjs/common";
import { MailService } from "./email.service";
import { EnvConfigModule } from "@Package/config";

@Global()
@Module({
    imports: [EnvConfigModule],
    providers: [MailService],
    exports: [MailService]
})
export class EmailModule {}