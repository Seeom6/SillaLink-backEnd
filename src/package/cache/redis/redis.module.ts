import {Module, Global, forwardRef} from '@nestjs/common';
import { RedisService } from './redis.service';

@Global()
@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {
  constructor(private readonly redisServise: RedisService){
    this.redisServise.connect()
  }
}
