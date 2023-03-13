import { Expose, Type } from 'class-transformer';
import { Category } from '../../categories/entities/category.entity';
import { GetCategoryDto } from '../../categories/dto/get-category.dto';

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
  @Type(() => GetCategoryDto)
  categories: Category[];

  @Expose()
  createdAt: Date;
}
