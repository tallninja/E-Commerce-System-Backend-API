import { Module, forwardRef } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItemsModule } from '../order-items/order-items.module';

@Module({
  exports: [OrdersService],
  imports: [
    TypeOrmModule.forFeature([Order]),
    UsersModule,
    forwardRef(() => OrderItemsModule), // circular dependency
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
