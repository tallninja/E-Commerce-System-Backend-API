import { NotFoundException } from '../../exceptions';
import { Order } from './order.entity';
import { OrderRepository } from './order.repository';

export class OrderService {
  public static instance: OrderService;

  private readonly repository: OrderRepository = OrderRepository.getInstance();

  async findAll(): Promise<Order[]> {
    return this.repository.findAll();
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.repository.findById(id);
    if (!order) throw new NotFoundException('Order Not Found');
    return order;
  }

  async create(data: Partial<Order>): Promise<Order> {
    return this.repository.save(data);
  }

  async update(id: string, data: Partial<Order>): Promise<Order> {
    const order = await this.findOne(id);
    Object.assign(order, data);
    return this.repository.save(order);
  }

  async delete(id: string): Promise<Order> {
    const order = await this.findOne(id);
    return this.repository.delete(order);
  }

  public static getInstance(): OrderService {
    if (!OrderService.instance) {
      OrderService.instance = new OrderService();
    }

    return OrderService.instance;
  }
}
