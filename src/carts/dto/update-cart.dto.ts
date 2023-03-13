import { IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateCartDto {
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  total: number;
}
