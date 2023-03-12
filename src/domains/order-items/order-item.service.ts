import { NotFoundException } from '../../exceptions';
import { OrderItem } from './order-item.entity';
import { OrderItemRepository } from './order-item.repository';

export class OrderItemService {
  public static instance: OrderItemService;

  private readonly repository: OrderItemRepository =
    OrderItemRepository.getInstance();

  async findAll(): Promise<OrderItem[]> {
    return this.repository.findAll();
  }

  async findOne(id: string): Promise<OrderItem> {
    const orderItem = await this.repository.findById(id);
    if (!orderItem) throw new NotFoundException('OrderItem Not Found');
    return orderItem;
  }

  async create(data: Partial<OrderItem>): Promise<OrderItem> {
    return this.repository.save(data);
  }

  async update(id: string, data: Partial<OrderItem>): Promise<OrderItem> {
    const orderItem = await this.findOne(id);
    Object.assign(orderItem, data);
    return this.repository.save(orderItem);
  }

  async delete(id: string): Promise<OrderItem> {
    const orderItem = await this.findOne(id);
    return this.repository.delete(orderItem);
  }

  public static getInstance(): OrderItemService {
    if (!OrderItemService.instance) {
      OrderItemService.instance = new OrderItemService();
    }

    return OrderItemService.instance;
  }
}
