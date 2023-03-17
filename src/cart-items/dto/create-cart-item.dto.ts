import { IsInt, IsNotEmpty, IsObject, Min } from 'class-validator';

export class CreateCartItemDto {
  @IsNotEmpty()
  cart: string;

  @IsNotEmpty()
  product: string;

  @IsInt()
  @Min(1)
  quantity: number;
}
