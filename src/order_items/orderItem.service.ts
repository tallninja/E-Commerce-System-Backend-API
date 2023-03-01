import { NotFoundException } from '../exceptions';
import { OrderItem } from './orderItems.entity';

interface FindOptionsFilter {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

interface FindOptionsRelations {
  product?: boolean;
}

export class OrderItemService {
  find = async (
    filters?: Partial<FindOptionsFilter>,
    relations?: FindOptionsRelations
  ) => {
    try {
      return await OrderItem.find({ where: filters, relations });
    } catch (error) {
      throw error;
    }
  };

  findOne = async (
    filters: Partial<FindOptionsFilter>,
    relations?: FindOptionsRelations
  ) => {
    try {
      const discount = await OrderItem.findOne({ where: filters, relations });
      if (!discount) throw new NotFoundException('Order Item Not Found');
      return discount;
    } catch (error) {
      throw error;
    }
  };

  create = async (data: Partial<OrderItem>) => {
    try {
      const orderItem = OrderItem.create(data);
      return await orderItem.save();
    } catch (error) {
      throw error;
    }
  };

  update = async (id: string, data: Partial<OrderItem>) => {
    try {
      const orderItem = await this.findOne({ id });
      Object.assign(orderItem, data);
      return orderItem.save();
    } catch (error) {
      throw error;
    }
  };

  delete = async (id: string) => {
    try {
      const orderItem = await this.findOne({ id });
      return await orderItem.remove();
    } catch (error) {
      throw error;
    }
  };
}
