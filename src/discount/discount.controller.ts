import { Request, Response, NextFunction } from 'express';
import { StatusCodes as SC } from 'http-status-codes';
import { Discount } from './discount.entity';
import { DiscountService } from './discount.service';

export class DiscountController {
  private service = new DiscountService();

  createDiscount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const discount = this.service.create(req.body as Discount);
      return res.status(SC.CREATED).json(discount);
    } catch (error) {
      next(error);
    }
  };

  getDiscounts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const discounts = await this.service.find();
      return res.status(SC.OK).json(discounts);
    } catch (error) {
      next(error);
    }
  };

  getDiscount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const discount = await this.service.findOne({ id: req.params.id });
      return res.status(SC.OK).json(discount);
    } catch (error) {
      next(error);
    }
  };

  getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const discount = await this.service.findOne(
        { id: req.params.id },
        { products: true }
      );
      return res.status(SC.OK).json(discount.products);
    } catch (error) {
      next(error);
    }
  };

  getActiveDiscounts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const discounts = await this.service.find({ active: true });
      return res.status(SC.OK).json(discounts);
    } catch (error) {
      next(error);
    }
  };

  getInactiveDiscounts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const discounts = await this.service.find({ active: false });
      return res.status(SC.OK).json(discounts);
    } catch (error) {
      next(error);
    }
  };

  editDiscount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedDiscount = await this.service.update(
        req.params.id,
        req.body
      );
      return res.status(SC.OK).json(updatedDiscount);
    } catch (error) {
      next(error);
    }
  };

  deleteDiscount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.delete(req.params.id);
      return res.status(SC.OK).json({ info: 'Discount Removed Successfully' });
    } catch (error) {
      next(error);
    }
  };
}
