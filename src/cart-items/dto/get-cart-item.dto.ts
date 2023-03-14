import { GetProductDto } from '../../products/dto/get-product.dto';
import { GetCartDto } from '../../carts/dto/get-cart.dto';
import { Expose, Type } from 'class-transformer';

export class GetCartItemDto {
  @Expose()
  id: string;

  @Expose()
  @Type(() => GetCartDto)
  cart: GetCartDto;

  @Expose()
  @Type(() => GetProductDto)
  product: GetProductDto;

  @Expose()
  quantity: number;

  @Expose()
  createdAt: Date;
}
