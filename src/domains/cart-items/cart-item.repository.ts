import { DbDataSource } from '../../data-source';
import { CartItem } from './cart-item.entity';
import { DataSource, Repository } from 'typeorm';

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

export class CartItemRepository {
  public static instance: CartItemRepository;

  private readonly dataSource: DataSource = DbDataSource.getInstance();
  private readonly repository: Repository<CartItem>;

  constructor() {
    this.repository = this.dataSource.getRepository(CartItem);
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

  public static getInstance(): CartItemRepository {
    if (!CartItemRepository.instance) {
      CartItemRepository.instance = new CartItemRepository();
    }

    return CartItemRepository.instance;
  }
}
