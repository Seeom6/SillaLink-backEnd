import { Module, Global } from '@nestjs/common';
import { RedisService } from './redis.service';
import Keyv from 'keyv';
import KeyvRedis from '@keyv/redis';
import { EnvConfigModule, EnvironmentService } from '@Package/config/environments';

@Global()
@Module({
  imports: [EnvConfigModule],
  providers: [
    {
      provide: 'REDIS_CLIENT',
      inject: [EnvironmentService],
      useFactory: (configService: EnvironmentService) => {
        const host = configService.get('redis.host');
        const port = configService.get('redis.port');
        const password = configService.get('redis.password');
        const db = configService.get('redis.databaseIndex');

        // Create Redis URL with credentials if password exists
        const redisUrl = password 
          ? `redis://:${password}@${host}:${port}/${db}`
          : `redis://${host}:${port}/${db}`;
        const redis = new KeyvRedis(redisUrl);
        return new Keyv({ store: redis });
      },
    },
    RedisService,
  ],
  exports: [RedisService],
})
export class RedisModule {}
