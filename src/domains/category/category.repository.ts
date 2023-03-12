import { DbDataSource } from '../../data-source';
import { DataSource, Repository } from 'typeorm';
import { Category } from './category.entity';

export interface FindOptionsWhere {
  id?: string;
  name?: string;
  slug?: string;
  createdAt?: Date;
}

export interface FindOptionsRelations {
  products?: boolean;
}

export class CategoryRepository {
  public static instance: CategoryRepository;

  private readonly dataSource: DataSource = DbDataSource.getInstance();
  private readonly repository: Repository<Category> =
    this.dataSource.getRepository(Category);

  async findAll(): Promise<Category[]> {
    return this.repository.find();
  }

  async findBy(
    where: FindOptionsWhere,
    relations?: FindOptionsRelations
  ): Promise<Category[]> {
    return this.repository.find({ where, relations });
  }

  async findById(id: string): Promise<Category | null> {
    return this.repository.findOneBy({ id });
  }

  async findOneBy(
    where: FindOptionsWhere,
    relations?: FindOptionsRelations
  ): Promise<Category | null> {
    return this.repository.findOne({ where, relations });
  }

  async save(data: Partial<Category>): Promise<Category> {
    const category: Category = this.repository.create(data);
    return this.repository.save(category);
  }

  async update(category: Category): Promise<Category> {
    return this.repository.save(category);
  }

  async delete(category: Category): Promise<Category> {
    return this.repository.remove(category);
  }

  public static getInstance(): CategoryRepository {
    if (!CategoryRepository.instance) {
      CategoryRepository.instance = new CategoryRepository();
    }

    return CategoryRepository.instance;
  }
}
