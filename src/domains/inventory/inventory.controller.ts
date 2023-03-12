import { Request, Response, NextFunction } from 'express';
import { StatusCodes as SC } from 'http-status-codes';
import { InventoryService } from './inventory.service';
import { Inventory } from './inventory.entity';

export class InventoryController {
  private service: InventoryService = InventoryService.getInstance();

  async createInventory(req: Request, res: Response, next: NextFunction) {
    try {
      const inventory: Inventory = await this.service.create(req.body);
      return res.status(SC.CREATED).json(inventory);
    } catch (error) {
      return next(error);
    }
  }

  async getInventories(req: Request, res: Response, next: NextFunction) {
    try {
      const inventories: Inventory[] = await this.service.findAll();
      return res.status(SC.OK).json(inventories);
    } catch (error) {
      return next(error);
    }
  }

  async getInventory(req: Request, res: Response, next: NextFunction) {
    try {
      const inventory: Inventory = await this.service.findOne(req.params.id);
      return res.status(SC.OK).json(inventory);
    } catch (error) {
      return next(error);
    }
  }

  async updateInventory(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedInventory: Inventory = await this.service.update(
        req.params.id,
        req.body
      );
      return res.status(SC.OK).json(updatedInventory);
    } catch (error) {
      return next(error);
    }
  }

  async deleteInventory(req: Request, res: Response, next: NextFunction) {
    try {
      const inventory: Inventory = await this.service.delete(req.params.id);
      return res.status(SC.OK).json(inventory);
    } catch (error) {
      return next(error);
    }
  }
}
