import { Module } from '@nestjs/common';
import { createClient } from 'redis';
import { REDIS } from './redis.constants';

@Module({
  providers: [
    {
      provide: REDIS,
      useValue: createClient({ url: 'redis://redis:6379' }),
    },
  ],
  exports: [REDIS],
})
export class RedisModule {}
