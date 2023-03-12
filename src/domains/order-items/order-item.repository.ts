import { DbDataSource } from '../../data-source';
import { DataSource, Repository } from 'typeorm';
import { OrderItem } from './order-item.entity';

export interface FindOptionsWhere {
  id?: string;
  order?: {
    id: string;
  };
  createdAt: Date;
}

export interface FindOptionsRelations {
  order?: boolean;
}

export class OrderItemRepository {
  public static instance: OrderItemRepository;

  private readonly dataSource: DataSource = DbDataSource.getInstance();
  private readonly repository: Repository<OrderItem> =
    this.dataSource.getRepository(OrderItem);

  async findAll(): Promise<OrderItem[]> {
    return this.repository.find();
  }

  async findBy(
    where: FindOptionsWhere,
    relations?: FindOptionsRelations
  ): Promise<OrderItem[]> {
    return this.repository.find({ where, relations });
  }

  async findById(id: string): Promise<OrderItem | null> {
    return this.repository.findOneBy({ id });
  }

  async findOneBy(
    where: FindOptionsWhere,
    relations?: FindOptionsRelations
  ): Promise<OrderItem | null> {
    return this.repository.findOne({ where, relations });
  }

  async save(data: Partial<OrderItem>): Promise<OrderItem> {
    const orderItem: OrderItem = this.repository.create(data);
    return this.repository.save(orderItem);
  }

  async update(orderItem: OrderItem): Promise<OrderItem> {
    return this.repository.save(orderItem);
  }

  async delete(orderItem: OrderItem): Promise<OrderItem> {
    return this.repository.remove(orderItem);
  }

  public static getInstance(): OrderItemRepository {
    if (!OrderItemRepository.instance) {
      OrderItemRepository.instance = new OrderItemRepository();
    }

    return OrderItemRepository.instance;
  }
}
