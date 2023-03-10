import { Service } from 'typedi';
import { Cart } from './cart.entity';

export interface FindOptionsWhere {
  id?: string;
  user?: {
    id: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface FindOptionsRelations {
  user?: boolean;
  items?: boolean;
}

@Service()
export class CartRepository {
  private repository;

  constructor() {
    this.repository = Cart.getRepository();
  }

  async findAll(): Promise<Cart[]> {
    return await this.repository.find();
  }

  async findBy(where: FindOptionsWhere): Promise<Cart[]> {
    return await this.repository.findBy(where);
  }

  async findById(id: string): Promise<Cart | null> {
    return await this.repository.findOneBy({ id });
  }

  async findOneBy(
    where: FindOptionsWhere,
    relations?: FindOptionsRelations
  ): Promise<Cart | null> {
    return await this.repository.findOne({ where, relations });
  }

  async save(cartData: Partial<Cart>): Promise<Cart> {
    const cart = this.repository.create(cartData);
    return await this.repository.save(cart);
  }

  async update(cart: Partial<Cart>): Promise<Cart> {
    return await this.repository.save(cart);
  }

  async delete(cart: Cart): Promise<Cart> {
    return await this.repository.remove(cart);
  }
}
