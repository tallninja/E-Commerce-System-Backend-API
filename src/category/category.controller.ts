import { Service } from 'typedi';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes as SC } from 'http-status-codes';
import { CategoryService } from './category.service';

@Service()
export class CategoryController {
  constructor(private service: CategoryService) {}

  createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await this.service.create(req.body);
      return res.status(SC.CREATED).json(category);
    } catch (error) {
      next(error);
    }
  };

  getCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await this.service.find();
      return res.status(SC.OK).json(categories);
    } catch (error) {
      next(error);
    }
  };

  getCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await this.service.findOne({ id: req.params.id });
      return res.status(SC.OK).json(category);
    } catch (error) {
      next(error);
    }
  };

  getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await this.service.findOne(
        { id: req.params.id },
        { products: true }
      );
      return res.status(SC.OK).json(category.products);
    } catch (error) {
      next(error);
    }
  };

  editCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await this.service.update(req.params.id, req.body);
      return res.status(SC.OK).json(category);
    } catch (error) {
      next(error);
    }
  };

  deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.delete(req.params.id);
      return res.status(SC.OK).json({ info: 'Category Deleted Successfully' });
    } catch (error) {
      next(error);
    }
  };
}
