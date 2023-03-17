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
import { RolesService } from './roles/roles.service';
import { UsersService } from './users/users.service';
import { UserRoles } from './roles/entities/user.roles';
import { Role } from './roles/entities/role.entity';
import { User } from './users/entities/user.entity';
import { CreateUserDto } from './users/dto/create-user.dto';
import { OrdersModule } from './orders/orders.module';

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
    UsersModule,
    RolesModule,
    ProductsModule,
    CategoriesModule,
    CartsModule,
    CartItemsModule,
    AuthModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [{ provide: APP_GUARD, useClass: RolesGuard }, AppService, Logger],
})
export class AppModule implements NestModule {
  constructor(
    @Inject(REDIS) private readonly redisClient: any,
    private readonly rolesService: RolesService,
    private readonly usersService: UsersService,
  ) {}

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

  async onModuleInit() {
    this.redisClient.on('error', (err) => console.error('Error:', err.message));
    await this.redisClient.connect();
  }
}
