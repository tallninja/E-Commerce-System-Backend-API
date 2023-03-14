import { IsNumber, IsOptional } from 'class-validator';

export class CreateCartDto {
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  total: number;
}
