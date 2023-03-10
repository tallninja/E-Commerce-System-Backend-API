import { Service } from 'typedi';
import { CartService } from './cart.service';
import { NextFunction, Request, Response } from 'express';
import { BadRequestException } from '../../exceptions';

@Service()
export class CartController {
  constructor(private cartService: CartService) {}

  getAllCarts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await this.cartService.findAll();
    } catch (error) {
      return next(error);
    }
  };

  getCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await this.cartService.findById(req.params.id);
    } catch (error) {
      return next(error);
    }
  };

  createCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.query;
      return await this.cartService.create(userId as string, req.body);
    } catch (error) {
      return next(error);
    }
  };

  updateCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await this.cartService.update(req.params.id, req.body);
    } catch (error) {
      return next(error);
    }
  };

  deleteCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await this.cartService.delete(req.params.id);
    } catch (error) {
      return next(error);
    }
  };
}
