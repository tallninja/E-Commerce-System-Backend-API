import { NotFoundException } from '../../exceptions';
import { Inventory } from './inventory.entity';
import { InventoryRepository } from './inventory.repository';

export class InventoryService {
  public static instance: InventoryService;

  private readonly repository: InventoryRepository =
    InventoryRepository.getInstance();

  async findAll(): Promise<Inventory[]> {
    return this.repository.findAll();
  }

  async findOne(id: string): Promise<Inventory> {
    const inventory = await this.repository.findById(id);
    if (!inventory) throw new NotFoundException('Inventory Not Found');
    return inventory;
  }

  async create(data: Partial<Inventory>): Promise<Inventory> {
    return this.repository.save(data);
  }

  async update(id: string, data: Partial<Inventory>): Promise<Inventory> {
    const inventory = await this.findOne(id);
    Object.assign(inventory, data);
    return this.repository.save(inventory);
  }

  async delete(id: string): Promise<Inventory> {
    const inventory = await this.findOne(id);
    return this.repository.delete(inventory);
  }

  public static getInstance(): InventoryService {
    if (!InventoryService.instance) {
      InventoryService.instance = new InventoryService();
    }

    return InventoryService.instance;
  }
}
