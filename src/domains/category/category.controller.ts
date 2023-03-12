import { Request, Response, NextFunction } from 'express';
import { StatusCodes as SC } from 'http-status-codes';
import { CategoryService } from './category.service';
import { Category } from './category.entity';

export class CategoryController {
  private service: CategoryService = CategoryService.getInstance();

  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const category: Category = await this.service.create(req.body);
      return res.status(SC.CREATED).json(category);
    } catch (error) {
      return next(error);
    }
  }

  async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories: Category[] = await this.service.findAll();
      return res.status(SC.OK).json(categories);
    } catch (error) {
      return next(error);
    }
  }

  async getCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const category: Category = await this.service.findById(req.params.id);
      return res.status(SC.OK).json(category);
    } catch (error) {
      return next(error);
    }
  }

  async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const category: Category = await this.service.update(
        req.params.id,
        req.body
      );
      return res.status(SC.OK).json(category);
    } catch (error) {
      return next(error);
    }
  }

  async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const category: Category = await this.service.delete(req.params.id);
      return res.status(SC.OK).json(category);
    } catch (error) {
      return next(error);
    }
  }
}
