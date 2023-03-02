import { Service } from 'typedi';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes as SC } from 'http-status-codes';
import { ProductService } from './product.service';

@Service()
export class ProductController {
  constructor(private service: ProductService) {}

  createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await this.service.create(req.body);
      return res.status(SC.CREATED).json(product);
    } catch (error) {
      return next(error);
    }
  };

  getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await this.service.find();
      return res.status(SC.CREATED).json(products);
    } catch (error) {
      return next(error);
    }
  };

  getProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await this.service.findOne({ id: req.params.id });
      return res.status(SC.OK).json(product);
    } catch (error) {
      return next(error);
    }
  };

  editProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await this.service.update(req.params.id, req.body);
      Object.assign(product, req.body);
      return res.status(SC.OK).json(product);
    } catch (error) {
      return next(error);
    }
  };

  deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await this.service.delete(req.params.id);
      return res.status(SC.OK).json({ info: 'Product deleted successfully' });
    } catch (error) {
      return next(error);
    }
  };
}
