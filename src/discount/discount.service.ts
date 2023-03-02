import { Service } from 'typedi';
import { BadRequestException, NotFoundException } from '../exceptions';
import { Discount } from './discount.entity';

interface FindOptionsFilter {
  id: string;
  name: string;
  percent: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface FindOptionsRelations {
  products?: boolean;
}

@Service()
export class DiscountService {
  find = async (
    filter?: Partial<FindOptionsFilter>,
    relations?: FindOptionsRelations
  ) => {
    try {
      return await Discount.find({ where: filter, relations });
    } catch (error) {
      throw error;
    }
  };

  findOne = async (
    filter: Partial<FindOptionsFilter>,
    relations?: FindOptionsRelations
  ) => {
    try {
      const discount = await Discount.findOne({ where: filter, relations });
      if (!discount) throw new NotFoundException('Discount Not Found');
      return discount;
    } catch (error) {
      throw error;
    }
  };

  create = async (data: Partial<Discount>) => {
    try {
      const discount = Discount.create(data);
      const existingDiscount = await this.findOne({ id: data.id });
      if (existingDiscount)
        throw new BadRequestException('Discount Already Exists');
      return await discount.save();
    } catch (error) {
      throw error;
    }
  };

  update = async (id: string, data: Partial<Discount>) => {
    try {
      const discount = await this.findOne({ id });
      Object.assign(discount, data);
      return await discount.save();
    } catch (error) {
      throw error;
    }
  };

  delete = async (id: string) => {
    try {
      const discount = await this.findOne({ id });
      await discount.remove();
    } catch (error) {
      throw error;
    }
  };
}
