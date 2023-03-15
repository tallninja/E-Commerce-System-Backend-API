import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as session from 'express-session';
import RedisStore from 'connect-redis';
import * as passport from 'passport';
import { REDIS } from '../../redis/redis.constants';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  constructor(@Inject(REDIS) private readonly redisClient: any) {}

  use(req: Request, res: Response, next: NextFunction) {
    // initialize the store
    const redisStore = new RedisStore({ client: this.redisClient });

    session({
      store: redisStore,
      saveUninitialized: false,
      secret: 'ksahlhsjj',
      resave: false,
      cookie: {
        sameSite: false,
        maxAge: 1 * 24 * 60 * 60 * 1000, // one day
      },
    });
    passport.initialize();
    passport.session();
    next();
  }
}
