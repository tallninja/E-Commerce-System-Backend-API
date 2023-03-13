import { Expose } from 'class-transformer';

export class GetProductDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  slug: string;

  @Expose()
  desc: string;

  @Expose()
  sku: string;

  @Expose()
  price: number;

  @Expose()
  qty: number;

  @Expose()
  createdAt: Date;
}
