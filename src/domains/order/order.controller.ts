import { Request, Response, NextFunction } from 'express';
import { StatusCodes as SC } from 'http-status-codes';
import { OrderService } from './order.service';
import { Order } from './order.entity';

export class OrderController {
  private service: OrderService = OrderService.getInstance();

  async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const order: Order = await this.service.create(req.body);
      return res.status(SC.CREATED).json(order);
    } catch (error) {
      return next(error);
    }
  }

  async getOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const inventories: Order[] = await this.service.findAll();
      return res.status(SC.OK).json(inventories);
    } catch (error) {
      return next(error);
    }
  }

  async getOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const order: Order = await this.service.findOne(req.params.id);
      return res.status(SC.OK).json(order);
    } catch (error) {
      return next(error);
    }
  }

  async updateOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedOrder: Order = await this.service.update(
        req.params.id,
        req.body
      );
      return res.status(SC.OK).json(updatedOrder);
    } catch (error) {
      return next(error);
    }
  }

  async deleteOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const order: Order = await this.service.delete(req.params.id);
      return res.status(SC.OK).json(order);
    } catch (error) {
      return next(error);
    }
  }
}
