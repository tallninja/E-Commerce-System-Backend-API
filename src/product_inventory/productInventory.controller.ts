import { Request, Response, NextFunction } from 'express';
import { StatusCodes as SC } from 'http-status-codes';
import { ProductInventory } from './productInventory.entity';
import { NotFoundException } from '../exceptions';

export const getInventories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const inventories = await ProductInventory.find();
    return res.status(SC.OK).json(inventories);
  } catch (error) {
    next(error);
  }
};

export const createInventory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const inventory = ProductInventory.create(req.body as ProductInventory);
    const newInventory = await inventory.save();
    return res.status(SC.CREATED).json(newInventory);
  } catch (error) {
    next(error);
  }
};

export const getInventory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const inventory = await ProductInventory.findOne({
      where: { id: req.params.id },
    });
    if (!inventory) throw new NotFoundException('Inventory Not Found');
    return res.status(SC.OK).json(inventory);
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
    const inventory = await ProductInventory.findOne({
      where: { id: req.params.id },
      relations: { products: true },
    });
    if (!inventory) throw new NotFoundException('Inventory Not Found');
    return res.status(SC.OK).json(inventory.products);
  } catch (error) {
    next(error);
  }
};

export const editInventory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const inventory = await ProductInventory.findOne({
      where: { id: req.params.id },
    });
    if (!inventory) throw new NotFoundException('Inventory Not Found');
    Object.assign(inventory, req.body);
    const updatedRepository = await inventory.save();
    return res.status(SC.OK).json(updatedRepository);
  } catch (error) {
    next(error);
  }
};

export const deleteInventory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const inventory = await ProductInventory.findOne({
      where: { id: req.params.id },
    });
    if (!inventory) throw new NotFoundException('Inventory Not Found');
    await ProductInventory.delete({ id: inventory.id });
    return res.status(SC.OK).json({ info: 'Inventory Deleted Successfully' });
  } catch (error) {
    next(error);
  }
};
