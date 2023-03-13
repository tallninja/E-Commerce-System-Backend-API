import { Expose } from 'class-transformer';

export class GetCategoryDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  slug: string;

  @Expose()
  desc: string;

  @Expose()
  createdAt: string;
}
