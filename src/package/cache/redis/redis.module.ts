import {Module, Global, forwardRef} from '@nestjs/common';
import { RedisService } from '@Package/cache';
import {EnvConfigModule} from "@Package/config";

@Global()
@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
