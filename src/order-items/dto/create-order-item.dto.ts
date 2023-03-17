import { IsInt, IsNotEmpty, IsUUID, Min } from 'class-validator';

export class CreateOrderItemDto {
  @IsNotEmpty()
  @IsUUID()
  product: string;

  @IsNotEmpty()
  @IsUUID()
  order: string;

  @IsInt()
  @Min(1)
  quantity: number;
}
