import { CartItemService } from './cart-item.service';
import { NextFunction, Request, Response } from 'express';
import { CartItem } from './cart-item.entity';
import { StatusCodes } from 'http-status-codes';

export class CartItemController {
  private service: CartItemService = CartItemService.getInstance();

  async getCartItems(req: Request, res: Response, next: NextFunction) {
    try {
      const cartItems: CartItem[] = await this.service.findAll();
      return res.status(StatusCodes.OK).json(cartItems);
    } catch (error) {
      throw next(error);
    }
  }

  async getCartItem(req: Request, res: Response, next: NextFunction) {
    try {
      const cartItem: CartItem = await this.service.findById(req.params.id);
      return res.status(StatusCodes.OK).json(cartItem);
    } catch (error) {
      throw next(error);
    }
  }

  async createCartItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { cartId } = req.query;
      const cartItem: CartItem = await this.service.create(
        cartId as string,
        req.body
      );
      return res.status(StatusCodes.CREATED).json(cartItem);
    } catch (error) {
      throw next(error);
    }
  }

  async updateCartItem(req: Request, res: Response, next: NextFunction) {
    try {
      const cartItem: CartItem = await this.service.update(
        req.params.id,
        req.body
      );
      return res.status(StatusCodes.OK).json(cartItem);
    } catch (error) {
      throw next(error);
    }
  }

  async deleteCartItem(req: Request, res: Response, next: NextFunction) {
    try {
      const cartItem: CartItem = await this.service.delete(req.params.id);
      return res.status(StatusCodes.OK).json(cartItem);
    } catch (error) {
      throw next(error);
    }
  }
}
