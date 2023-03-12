import { NotFoundException } from '../../exceptions';
import { Discount } from './discount.entity';
import { DiscountRepository } from './discount.repository';

export class DiscountService {
  public static instance: DiscountService;

  private readonly repository: DiscountRepository =
    DiscountRepository.getInstance();

  async findAll(): Promise<Discount[]> {
    return this.repository.findAll();
  }

  async findOne(id: string): Promise<Discount> {
    const discount = await this.repository.findById(id);
    if (!discount) throw new NotFoundException('Discount Not Found');
    return discount;
  }

  async create(data: Partial<Discount>): Promise<Discount> {
    return this.repository.save(data);
  }

  async update(id: string, data: Partial<Discount>): Promise<Discount> {
    const discount = await this.findOne(id);
    Object.assign(discount, data);
    return this.repository.save(discount);
  }

  async delete(id: string): Promise<Discount> {
    const discount = await this.findOne(id);
    return this.repository.delete(discount);
  }

  public static getInstance(): DiscountService {
    if (!DiscountService.instance) {
      DiscountService.instance = new DiscountService();
    }

    return DiscountService.instance;
  }
}
