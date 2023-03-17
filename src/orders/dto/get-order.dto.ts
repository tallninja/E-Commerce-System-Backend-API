import { Expose } from 'class-transformer';

export class GetOrderDto {
  @Expose()
  id: string;

  @Expose()
  total: number;

  @Expose()
  createdAt: Date;
}
