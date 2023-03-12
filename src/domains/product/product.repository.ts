import { DbDataSource } from '../../data-source';
import { DataSource, Repository } from 'typeorm';
import { Product } from './product.entity';

export interface FindOptionsWhere {
  id?: string;
  name?: string;
  slug?: string;
  sku?: string;
  price?: number;
  createdAt?: Date;
}

export interface FindOptionsRelations {
  category?: boolean;
  inventory?: boolean;
  discount?: boolean;
}

export class ProductRepository {
  public static instance: ProductRepository;

  private readonly dataSource: DataSource = DbDataSource.getInstance();
  private readonly repository: Repository<Product> =
    this.dataSource.getRepository(Product);

  async findAll(): Promise<Product[]> {
    return this.repository.find();
  }

  async findBy(
    where: FindOptionsWhere,
    relations?: FindOptionsRelations
  ): Promise<Product[]> {
    return this.repository.find({ where, relations });
  }

  async findById(id: string): Promise<Product | null> {
    return this.repository.findOneBy({ id });
  }

  async findOneBy(
    where: FindOptionsWhere,
    relations?: FindOptionsRelations
  ): Promise<Product | null> {
    return this.repository.findOne({ where, relations });
  }

  async save(data: Partial<Product>): Promise<Product> {
    const product: Product = this.repository.create(data);
    return this.repository.save(product);
  }

  async update(product: Product): Promise<Product> {
    return this.repository.save(product);
  }

  async delete(product: Product): Promise<Product> {
    return this.repository.remove(product);
  }

  public static getInstance(): ProductRepository {
    if (!ProductRepository.instance) {
      ProductRepository.instance = new ProductRepository();
    }

    return ProductRepository.instance;
  }
}
