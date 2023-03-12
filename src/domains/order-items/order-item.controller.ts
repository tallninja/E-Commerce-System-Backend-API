import { Request, Response, NextFunction } from 'express';
import { StatusCodes as SC } from 'http-status-codes';
import { OrderItemService } from './order-item.service';
import { OrderItem } from './order-item.entity';

export class OrderItemController {
  private service: OrderItemService = OrderItemService.getInstance();

  async createOrderItem(req: Request, res: Response, next: NextFunction) {
    try {
      const orderItem: OrderItem = await this.service.create(req.body);
      return res.status(SC.CREATED).json(orderItem);
    } catch (error) {
      return next(error);
    }
  }

  async getOrderItems(req: Request, res: Response, next: NextFunction) {
    try {
      const orderItems: OrderItem[] = await this.service.findAll();
      return res.status(SC.OK).json(orderItems);
    } catch (error) {
      return next(error);
    }
  }

  async getOrderItem(req: Request, res: Response, next: NextFunction) {
    try {
      const orderItem: OrderItem = await this.service.findOne(req.params.id);
      return res.status(SC.OK).json(orderItem);
    } catch (error) {
      return next(error);
    }
  }

  async updateOrderItem(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedOrderItem: OrderItem = await this.service.update(
        req.params.id,
        req.body
      );
      return res.status(SC.OK).json(updatedOrderItem);
    } catch (error) {
      return next(error);
    }
  }

  async deleteOrderItem(req: Request, res: Response, next: NextFunction) {
    try {
      const orderItem: OrderItem = await this.service.delete(req.params.id);
      return res.status(SC.OK).json(orderItem);
    } catch (error) {
      return next(error);
    }
  }
}
