import { DbDataSource } from '../../data-source';
import { DataSource, Repository } from 'typeorm';
import { Discount } from './discount.entity';

export interface FindOptionsWhere {
  id?: string;
  name?: string;
  percent?: number;
  active?: boolean;
  createdAt?: Date;
}

export interface FindOptionsRelations {
  products?: boolean;
}

export class DiscountRepository {
  public static instance: DiscountRepository;

  private readonly dataSource: DataSource = DbDataSource.getInstance();
  private readonly repository: Repository<Discount> =
    this.dataSource.getRepository(Discount);

  async findAll(): Promise<Discount[]> {
    return this.repository.find();
  }

  async findBy(
    where: FindOptionsWhere,
    relations?: FindOptionsRelations
  ): Promise<Discount[]> {
    return this.repository.find({ where, relations });
  }

  async findById(id: string): Promise<Discount | null> {
    return this.repository.findOneBy({ id });
  }

  async findOneBy(
    where: FindOptionsWhere,
    relations?: FindOptionsRelations
  ): Promise<Discount | null> {
    return this.repository.findOne({ where, relations });
  }

  async save(data: Partial<Discount>): Promise<Discount> {
    const discount: Discount = this.repository.create(data);
    return this.repository.save(discount);
  }

  async update(discount: Discount): Promise<Discount> {
    return this.repository.save(discount);
  }

  async delete(discount: Discount): Promise<Discount> {
    return this.repository.remove(discount);
  }

  public static getInstance(): DiscountRepository {
    if (!DiscountRepository.instance) {
      DiscountRepository.instance = new DiscountRepository();
    }

    return DiscountRepository.instance;
  }
}
