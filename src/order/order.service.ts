import { NotFoundException } from '../exceptions';
import { Order } from './order.entity';

interface FindOptionsFilters {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

interface FindOptionsRelations {
  user?: boolean;
  order?: boolean;
}

export class OrderService {
  find = async (
    filters?: Partial<FindOptionsFilters>,
    relations?: FindOptionsRelations
  ) => {
    try {
      return await Order.find({ where: filters, relations });
    } catch (error) {
      throw error;
    }
  };

  findOne = async (
    filters?: Partial<FindOptionsFilters>,
    relations?: FindOptionsRelations
  ) => {
    try {
      const order = await Order.findOne({ where: filters, relations });
      if (!order) throw new NotFoundException('Order Not Found');
      return order;
    } catch (error) {
      throw error;
    }
  };

  create = async (data: Partial<Order>) => {
    try {
      const order = Order.create(data);
      return await order.save();
    } catch (error) {
      throw error;
    }
  };

  update = async (id: string, data: Partial<Order>) => {
    try {
      const order = await this.findOne({ id });
      Object.assign(order, data);
      return await order.save();
    } catch (error) {
      throw error;
    }
  };

  delete = async (id: string) => {
    try {
      const order = await this.findOne({ id });
      return await order.remove();
    } catch (error) {
      throw error;
    }
  };
}
