import { IsInt, IsObject, Min } from 'class-validator';
import { Cart } from '../../carts/entities/cart.entity';
import { Product } from '../../products/entities/product.entity';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCartItemDto {
  @IsObject()
  @Type(() => PartialType(Cart))
  cart: Partial<Cart>;

  @IsObject()
  @Type(() => PartialType(Product))
  product: Product;

  @IsInt()
  @Min(1)
  quantity: number;
}
