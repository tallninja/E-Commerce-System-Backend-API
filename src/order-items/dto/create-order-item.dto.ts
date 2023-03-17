import { Order } from 'src/orders/entities/order.entity';
import { Product } from '../../products/entities/product.entity';
import {
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  Min,
} from 'class-validator';

export class CreateOrderItemDto {
  @IsNotEmpty()
  @IsNotEmptyObject()
  @IsObject()
  product: Product;

  @IsNotEmpty()
  @IsNotEmptyObject()
  @IsObject()
  order: Order;

  @IsInt()
  @Min(1)
  quantity: number;
}
