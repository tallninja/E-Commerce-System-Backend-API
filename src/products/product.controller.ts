import { Request, Response } from 'express';
import { StatusCodes as SC } from 'http-status-codes';
import { Product } from './product.entity';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = Product.create(req.body as Product);
    const newProduct = await product.save();
    return res.status(SC.CREATED).json(newProduct);
  } catch (error) {
    console.error(error);
    return res
      .status(SC.INTERNAL_SERVER_ERROR)
      .json({ error: 'Failed to create product' });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    return res.status(SC.CREATED).json(products);
  } catch (error) {
    console.error(error);
    return res
      .status(SC.INTERNAL_SERVER_ERROR)
      .json({ error: 'Failed to get products' });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findOne({ where: { id: req.params.id } });
    if (!product)
      return res.status(SC.NOT_FOUND).json({ error: 'Product not found' });
    return res.status(SC.OK).json(product);
  } catch (error) {
    return res
      .status(SC.INTERNAL_SERVER_ERROR)
      .json({ error: 'Failed to get product' });
  }
};

export const editProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findOne({ where: { id: req.params.id } });
    if (!product)
      return res.status(SC.NOT_FOUND).json({ error: 'Product not found' });
    Object.assign(product, req.body);
    const updatedProduct = await product.save();
    return res.status(SC.OK).json(updatedProduct);
  } catch (error) {
    return res
      .status(SC.INTERNAL_SERVER_ERROR)
      .json({ error: 'Failed to edit product' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findOne({ where: { id: req.params.id } });
    if (!product)
      return res.status(SC.NOT_FOUND).json({ error: 'Product not found' });
    await Product.delete({ id: req.params.id });
    return res.status(SC.OK).json({ info: 'Product deleted successfully' });
  } catch (error) {
    return res
      .status(SC.INTERNAL_SERVER_ERROR)
      .json({ error: 'Failed to delete product' });
  }
};
