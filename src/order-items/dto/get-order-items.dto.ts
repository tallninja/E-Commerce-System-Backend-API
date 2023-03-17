import { Expose, Type } from 'class-transformer';
import { GetProductDto } from '../../products/dto/get-product.dto';
import { GetOrderDto } from '../../orders/dto/get-order.dto';

export class GetOrderItemDto {
  @Expose()
  id: string;

  @Expose()
  @Type(() => GetOrderDto)
  order: GetOrderDto;

  @Expose()
  @Type(() => GetProductDto)
  product: GetProductDto;

  @Expose()
  quantity: number;

  @Expose()
  createdAt: Date;
}
