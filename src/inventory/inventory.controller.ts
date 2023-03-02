import { Request, Response, NextFunction } from 'express';
import { StatusCodes as SC } from 'http-status-codes';
import { InventoryService } from './inventory.service';

export class InventoryController {
  private readonly service = new InventoryService();

  getInventories = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const inventories = await this.service.find();
      return res.status(SC.OK).json(inventories);
    } catch (error) {
      next(error);
    }
  };

  createInventory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const inventory = this.service.create(req.body);
      return res.status(SC.CREATED).json(inventory);
    } catch (error) {
      next(error);
    }
  };

  getInventory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const inventory = await this.service.findOne({ id: req.params.id });
      return res.status(SC.OK).json(inventory);
    } catch (error) {
      next(error);
    }
  };

  getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const inventory = await this.service.findOne(
        { id: req.params.id },
        { products: true }
      );
      return res.status(SC.OK).json(inventory.products);
    } catch (error) {
      next(error);
    }
  };

  editInventory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const inventory = await this.service.update(req.params.id, req.body);
      return res.status(SC.OK).json(inventory);
    } catch (error) {
      next(error);
    }
  };

  deleteInventory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.delete(req.params.id);
      return res.status(SC.OK).json({ info: 'Inventory Deleted Successfully' });
    } catch (error) {
      next(error);
    }
  };
}
