import { Request, Response, NextFunction } from 'express';
import { StatusCodes as SC } from 'http-status-codes';
import { ProductService } from './product.service';
import { Product } from './product.entity';

export class ProductController {
  private service: ProductService = ProductService.getInstance();

  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const product: Product = await this.service.create(req.body);
      return res.status(SC.CREATED).json(product);
    } catch (error) {
      return next(error);
    }
  }

  async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products: Product[] = await this.service.findAll();
      return res.status(SC.OK).json(products);
    } catch (error) {
      return next(error);
    }
  }

  async getProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const product: Product = await this.service.findOne(req.params.id);
      return res.status(SC.OK).json(product);
    } catch (error) {
      return next(error);
    }
  }

  async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedProduct: Product = await this.service.update(
        req.params.id,
        req.body
      );
      return res.status(SC.OK).json(updatedProduct);
    } catch (error) {
      return next(error);
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const product: Product = await this.service.delete(req.params.id);
      return res.status(SC.OK).json(product);
    } catch (error) {
      return next(error);
    }
  }
}
