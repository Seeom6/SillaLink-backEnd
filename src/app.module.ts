import { Module } from '@nestjs/common';
import {EnvConfigModule, WinstonLogger} from '@Package/config';
import { MongoConnection } from '@Package/database/mongodb';
import {UserModule} from "@Modules/user";
import {AuthModule} from "@Modules/auth/auth.module";
import { RedisModule } from '@Package/cache/redis/redis.module';
import { EmailModule } from '@Package/services/email/email.module';
@Module({
  imports: [
    EnvConfigModule,
    UserModule,
    AuthModule,
    MongoConnection,
    WinstonLogger,
    RedisModule,
    EmailModule
  ],
})
export class AppModule {
}
