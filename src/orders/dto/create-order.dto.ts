import { IsDecimal, IsNumber, Min } from 'class-validator';

export class CreateOrderDto {
  @IsNumber({ maxDecimalPlaces: 2 })
  total: number;
}
