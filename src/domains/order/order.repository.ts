import { DbDataSource } from '../../data-source';
import { DataSource, Repository } from 'typeorm';
import { Order } from './order.entity';

export interface FindOptionsWhere {
  id?: string;
  user?: {
    id: string;
  };
  payment?: {
    id: string;
  };
  createdAt: Date;
}

export interface FindOptionsRelations {
  items?: boolean;
}

export class OrderRepository {
  public static instance: OrderRepository;

  private readonly dataSource: DataSource = DbDataSource.getInstance();
  private readonly repository: Repository<Order> =
    this.dataSource.getRepository(Order);

  async findAll(): Promise<Order[]> {
    return this.repository.find();
  }

  async findBy(
    where: FindOptionsWhere,
    relations?: FindOptionsRelations
  ): Promise<Order[]> {
    return this.repository.find({ where, relations });
  }

  async findById(id: string): Promise<Order | null> {
    return this.repository.findOneBy({ id });
  }

  async findOneBy(
    where: FindOptionsWhere,
    relations?: FindOptionsRelations
  ): Promise<Order | null> {
    return this.repository.findOne({ where, relations });
  }

  async save(data: Partial<Order>): Promise<Order> {
    const order: Order = this.repository.create(data);
    return this.repository.save(order);
  }

  async update(order: Order): Promise<Order> {
    return this.repository.save(order);
  }

  async delete(order: Order): Promise<Order> {
    return this.repository.remove(order);
  }

  public static getInstance(): OrderRepository {
    if (!OrderRepository.instance) {
      OrderRepository.instance = new OrderRepository();
    }

    return OrderRepository.instance;
  }
}
