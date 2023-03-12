import { DbDataSource } from '../../data-source';
import { DataSource, Repository } from 'typeorm';
import { Inventory } from './inventory.entity';

export interface FindOptionsWhere {
  id?: string;
}

export interface FindOptionsRelations {
  products?: boolean;
}

export class InventoryRepository {
  public static instance: InventoryRepository;

  private readonly dataSource: DataSource = DbDataSource.getInstance();
  private readonly repository: Repository<Inventory> =
    this.dataSource.getRepository(Inventory);

  async findAll(): Promise<Inventory[]> {
    return this.repository.find();
  }

  async findBy(
    where: FindOptionsWhere,
    relations?: FindOptionsRelations
  ): Promise<Inventory[]> {
    return this.repository.find({ where, relations });
  }

  async findById(id: string): Promise<Inventory | null> {
    return this.repository.findOneBy({ id });
  }

  async findOneBy(
    where: FindOptionsWhere,
    relations?: FindOptionsRelations
  ): Promise<Inventory | null> {
    return this.repository.findOne({ where, relations });
  }

  async save(data: Partial<Inventory>): Promise<Inventory> {
    const inventory: Inventory = this.repository.create(data);
    return this.repository.save(inventory);
  }

  async update(inventory: Inventory): Promise<Inventory> {
    return this.repository.save(inventory);
  }

  async delete(inventory: Inventory): Promise<Inventory> {
    return this.repository.remove(inventory);
  }

  public static getInstance(): InventoryRepository {
    if (!InventoryRepository.instance) {
      InventoryRepository.instance = new InventoryRepository();
    }

    return InventoryRepository.instance;
  }
}
