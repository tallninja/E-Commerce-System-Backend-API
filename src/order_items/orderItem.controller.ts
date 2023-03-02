import { Service } from 'typedi';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes as SC } from 'http-status-codes';
import { OrderItemService } from './orderItem.service';

@Service()
export class OrderItemController {
  constructor(private service: OrderItemService) {}

  createOrderItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderItem = await this.service.create(req.body);
      return res.status(SC.CREATED).json(orderItem);
    } catch (error) {
      next(error);
    }
  };

  getOrderItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderItems = await this.service.find();
      return res.status(SC.OK).json(orderItems);
    } catch (error) {
      next(error);
    }
  };

  getOrderItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderItem = await this.service.findOne(
        { id: req.params.id },
        { product: true, order: true }
      );
      return res.status(SC.OK).json(orderItem);
    } catch (error) {
      next(error);
    }
  };

  editOrderItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedOrderItem = await this.service.update(
        req.params.id,
        req.body
      );
      return res.status(SC.OK).json(updatedOrderItem);
    } catch (error) {
      next(error);
    }
  };

  deleteOrderItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.delete(req.params.id);
      return res
        .status(SC.OK)
        .json({ info: 'Order Item Deleted Successfully' });
    } catch (error) {
      next(error);
    }
  };
}
