import { NotFoundException } from '../exceptions';
import { ProductInventory } from './productInventory.entity';

interface FindOptionsFilters {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

interface FindOptionsRelations {
  products: boolean;
}

export class ProductInventoryService {
  find = async (
    filters?: Partial<FindOptionsFilters>,
    relations?: Partial<FindOptionsRelations>
  ) => {
    try {
      const inventories = await ProductInventory.find({
        where: filters,
        relations,
      });
      return inventories;
    } catch (error) {
      throw error;
    }
  };

  findOne = async (
    filters?: Partial<FindOptionsFilters>,
    relations?: Partial<FindOptionsRelations>
  ) => {
    try {
      const inventory = await ProductInventory.findOne({
        where: filters,
        relations,
      });
      if (!inventory) throw new NotFoundException('Inventory Not Found');
      return inventory;
    } catch (error) {
      throw error;
    }
  };

  create = async (data: Partial<ProductInventory>) => {
    try {
      const inventory = ProductInventory.create(data);
      return await inventory.save();
    } catch (error) {
      throw error;
    }
  };

  update = async (id: string, data: Partial<ProductInventory>) => {
    try {
      const inventory = await this.findOne({ id });
      Object.assign(inventory, data);
      return await inventory.save();
    } catch (error) {
      throw error;
    }
  };

  delete = async (id: string) => {
    try {
      const inventory = await this.findOne({ id });
      return await inventory.remove();
    } catch (error) {
      throw error;
    }
  };
}
