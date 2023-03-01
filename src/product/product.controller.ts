import { NextFunction, Request, Response } from 'express';
import { StatusCodes as SC } from 'http-status-codes';
import { Product } from './product.entity';
import { NotFoundException } from '../exceptions';

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = Product.create(req.body as Product);
    const newProduct = await product.save();
    return res.status(SC.CREATED).json(newProduct);
  } catch (error) {
    return next(error);
  }
};

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find();
    return res.status(SC.CREATED).json(products);
  } catch (error) {
    return next(error);
  }
};

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await Product.findOne({ where: { id: req.params.id } });
    if (!product) throw new NotFoundException('Product Not Found');
    return res.status(SC.OK).json(product);
  } catch (error) {
    return next(error);
  }
};

export const editProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await Product.findOne({ where: { id: req.params.id } });
    if (!product) throw new NotFoundException('Product Not Found');
    Object.assign(product, req.body);
    const updatedProduct = await product.save();
    return res.status(SC.OK).json(updatedProduct);
  } catch (error) {
    return next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await Product.findOne({ where: { id: req.params.id } });
    if (!product) throw new NotFoundException('Product Not Found');
    await product.softRemove();
    return res.status(SC.OK).json({ info: 'Product deleted successfully' });
  } catch (error) {
    return next(error);
  }
};
