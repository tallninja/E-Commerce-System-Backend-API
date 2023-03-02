import { Service } from 'typedi';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes as SC } from 'http-status-codes';
import { OrderService } from './order.service';

@Service()
export class OrderController {
  constructor(private service: OrderService) {}

  getOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orders = await this.service.find();
      return res.status(SC.OK).json(orders);
    } catch (error) {
      next(error);
    }
  };

  getOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const order = await this.service.findOne(
        { id: req.params.id },
        { user: true, order: true }
      );
      return res.status(SC.OK).json(order);
    } catch (error) {
      next(error);
    }
  };

  createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const order = await this.service.create(req.body);
      return res.status(SC.CREATED).json(order);
    } catch (error) {
      next(error);
    }
  };

  updateOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedOrder = await this.service.update(req.params.id, req.body);
      return res.status(SC.OK).json(updatedOrder);
    } catch (error) {
      next(error);
    }
  };

  deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.delete(req.params.id);
      return res.status(SC.OK).json({ info: 'Order Deleted Successfully' });
    } catch (error) {
      next(error);
    }
  };
}
