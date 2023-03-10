import { Service } from 'typedi';
import { CartItem } from './cart-item.entity';
import { PgDataSource } from '../../db';
import { Repository } from 'typeorm';

export interface FindOptionsWhere {
  id?: string;
  product?: {
    id: string;
  };
  cart?: {
    id: string;
  };
  createdAt?: Date;
}

export interface FindOptionsRelations {
  product?: boolean;
  cart?: boolean;
}

@Service()
export class CartItemRepository {
  private repository: Repository<CartItem>;

  constructor() {
    this.repository = PgDataSource.getRepository(CartItem);
  }

  async findAll(): Promise<CartItem[]> {
    return this.repository.find();
  }

  async findBy(where: FindOptionsWhere): Promise<CartItem[]> {
    return this.repository.findBy(where);
  }

  async findById(
    id: string,
    relations?: FindOptionsRelations
  ): Promise<CartItem | null> {
    return this.repository.findOne({ where: { id }, relations });
  }

  async findOneBy(
    where: FindOptionsWhere,
    relations?: FindOptionsRelations
  ): Promise<CartItem | null> {
    return this.repository.findOne({ where, relations });
  }

  async save(data: Partial<CartItem>): Promise<CartItem> {
    const cartItem = this.repository.create(data);
    return cartItem.save();
  }

  async update(cartItem: CartItem): Promise<CartItem> {
    return this.repository.save(cartItem);
  }

  async delete(cartItem: CartItem): Promise<CartItem> {
    return this.repository.remove(cartItem);
  }
}
