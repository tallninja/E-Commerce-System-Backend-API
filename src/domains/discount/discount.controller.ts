import { Request, Response, NextFunction } from 'express';
import { StatusCodes as SC } from 'http-status-codes';
import { DiscountService } from './discount.service';
import { Discount } from './discount.entity';

export class DiscountController {
  private service: DiscountService = DiscountService.getInstance();

  async createDiscount(req: Request, res: Response, next: NextFunction) {
    try {
      const discount: Discount = await this.service.create(req.body);
      return res.status(SC.CREATED).json(discount);
    } catch (error) {
      return next(error);
    }
  }

  async getDiscounts(req: Request, res: Response, next: NextFunction) {
    try {
      const discounts: Discount[] = await this.service.findAll();
      return res.status(SC.OK).json(discounts);
    } catch (error) {
      return next(error);
    }
  }

  async getDiscount(req: Request, res: Response, next: NextFunction) {
    try {
      const discount: Discount = await this.service.findOne(req.params.id);
      return res.status(SC.OK).json(discount);
    } catch (error) {
      return next(error);
    }
  }

  async updateDiscount(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedDiscount: Discount = await this.service.update(
        req.params.id,
        req.body
      );
      return res.status(SC.OK).json(updatedDiscount);
    } catch (error) {
      return next(error);
    }
  }

  async deleteDiscount(req: Request, res: Response, next: NextFunction) {
    try {
      const discount: Discount = await this.service.delete(req.params.id);
      return res.status(SC.OK).json(discount);
    } catch (error) {
      return next(error);
    }
  }
}
