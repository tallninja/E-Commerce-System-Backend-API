import { IsNotEmpty, Max } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  desc: string;

  @IsNotEmpty()
  sku: string;

  @IsNotEmpty()
  price: number;
}
