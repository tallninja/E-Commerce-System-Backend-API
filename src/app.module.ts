import {
  Inject,
  Logger,
  LoggerService,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { CartsModule } from './carts/carts.module';
import { CartItemsModule } from './cart-items/cart-items.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './redis/redis.module';
import { REDIS } from './redis/redis.constants';
import { RolesModule } from './roles/roles.module';
import RedisStore from 'connect-redis';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'ecommdb',
      username: 'admin',
      password: 'password',
      synchronize: true,
      autoLoadEntities: true,
    }),
    RedisModule,
    ProductsModule,
    CategoriesModule,
    CartsModule,
    CartItemsModule,
    UsersModule,
    AuthModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [{ provide: APP_GUARD, useClass: RolesGuard }, AppService, Logger],
})
export class AppModule implements NestModule {
  constructor(@Inject(REDIS) private readonly redisClient: any) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          store: new RedisStore({ client: this.redisClient }),
          saveUninitialized: false,
          secret: 'ksahlhsjj',
          resave: false,
          cookie: {
            httpOnly: false,
            sameSite: true,
            maxAge: 1 * 24 * 60 * 60 * 1000, // one day
          },
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }

  onModuleInit() {
    this.redisClient.on('error', (err) => console.error('Error:', err.message));
    this.redisClient.connect();
  }
}
