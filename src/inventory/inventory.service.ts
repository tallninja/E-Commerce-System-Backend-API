import { Service } from 'typedi';
import { NotFoundException } from '../exceptions';
import { Inventory } from './inventory.entity';

interface FindOptionsFilters {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

interface FindOptionsRelations {
  products: boolean;
}

@Service()
export class InventoryService {
  find = async (
    filters?: Partial<FindOptionsFilters>,
    relations?: Partial<FindOptionsRelations>
  ) => {
    try {
      const inventories = await Inventory.find({
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
      const inventory = await Inventory.findOne({
        where: filters,
        relations,
      });
      if (!inventory) throw new NotFoundException('Inventory Not Found');
      return inventory;
    } catch (error) {
      throw error;
    }
  };

  create = async (data: Partial<Inventory>) => {
    try {
      const inventory = Inventory.create(data);
      return await inventory.save();
    } catch (error) {
      throw error;
    }
  };

  update = async (id: string, data: Partial<Inventory>) => {
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
