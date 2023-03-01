import { Request, Response, NextFunction } from 'express';
import { StatusCodes as SC } from 'http-status-codes';
import { ProductCategory } from './productCategory.entity';
import { BadRequestException, NotFoundException } from '../exceptions';

export const createProductCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = ProductCategory.create(req.body as ProductCategory);

    const existingCategory = await ProductCategory.findOne({
      where: { name: category.name },
    });
    if (existingCategory)
      throw new BadRequestException('Category Already Exists');

    const newCategory = await category.save();
    return res.status(SC.CREATED).json(newCategory);
  } catch (error) {
    next(error);
  }
};

export const getProductCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await ProductCategory.find();
    return res.status(SC.OK).json(categories);
  } catch (error) {
    next(error);
  }
};

export const getProductCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await ProductCategory.findOne({
      where: { id: req.params.id },
    });
    if (!category) throw new NotFoundException('Category Not Found');
    return res.status(SC.OK).json(category);
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await ProductCategory.findOne({
      where: { id: req.params.id },
      relations: { products: true },
    });
    if (!category) throw new NotFoundException('Category Not Found');
    return res.status(SC.OK).json(category.products);
  } catch (error) {
    next(error);
  }
};

export const editProductCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await ProductCategory.findOne({
      where: { id: req.params.id },
    });
    if (!category) throw new NotFoundException('Category Not Found');
    Object.assign(category, req.body);
    const updatedCategory = await category.save();
    return res.status(SC.OK).json(updatedCategory);
  } catch (error) {
    next(error);
  }
};

export const deleteProductCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await ProductCategory.findOne({
      where: { id: req.params.id },
    });
    if (!category) throw new NotFoundException('Category Not Found');
    await category.softRemove();
    return res.status(SC.OK).json({ info: 'Category Deleted Successfully' });
  } catch (error) {
    next(error);
  }
};
