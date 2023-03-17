import { Expose, Type } from 'class-transformer';
import { CartItem } from '../../cart-items/entities/cart-item.entity';
import { GetCartItemDto } from '../../cart-items/dto/get-cart-item.dto';
import { GetUserDto } from '../../users/dto/get-user.dto';

export class GetCartDto {
  @Expose()
  id: string;

  @Expose()
  total: number;

  @Expose()
  @Type(() => GetUserDto)
  user: GetUserDto;

  @Expose()
  @Type(() => GetCartItemDto)
  items: CartItem[];

  @Expose()
  createdAt: Date;
}
