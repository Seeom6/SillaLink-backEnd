import { Module } from '@nestjs/common';
import { EnvConfigModule } from '@Package/config';
import { MongoConnection } from '@Package/database/mongodb';
import {UserModule} from "@Modules/user";
import {AuthModule} from "@Modules/auth/auth.module";

@Module({
  imports: [
    EnvConfigModule,
    UserModule,
    AuthModule,
    MongoConnection
  ],
})
export class AppModule {
}
