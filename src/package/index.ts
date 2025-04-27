import { RedisModule } from "./cache/redis/redis.module"
import { EnvConfigModule, WinstonLogger } from "./config"
import { MongoConnection } from "./database"
import { FileUploadModule, ServiceStaticModule } from "./file"
import { EmailModule } from "./services/email/email.module"

export * from "./database"
export * from "./error"
export * from "./config"
export * from "./auth"
export * from "./api"
export * from "./services"

export const PackageModule = [
    EnvConfigModule,
    MongoConnection,
    WinstonLogger,
    RedisModule,
    EmailModule,
    FileUploadModule,
    ServiceStaticModule,
]