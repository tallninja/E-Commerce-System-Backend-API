import { Service } from 'typedi';
import { CartItemRepository } from './cart-item.repository';
import { CartItem } from './cart-item.entity';
import { Cart, CartService } from '../../domains/carts';
import { NotFoundException } from '../../exceptions';

@Service()
export class CartItemService {
  public static instance: CartItemService;

  private repository: CartItemRepository = CartItemRepository.getInstance();
  private cartService: CartService = CartService.getInstance();

  constructor() {}

  async findAll(): Promise<CartItem[]> {
    return this.repository.findAll();
  }

  async findById(id: string): Promise<CartItem> {
    const cartItem: CartItem | null = await this.repository.findById(id);
    if (!cartItem) throw new NotFoundException('Cart Not Found');
    return cartItem;
  }

  async create(cartId: string, data: Partial<CartItem>): Promise<CartItem> {
    const cart: Cart = await this.cartService.findById(cartId);
    if (!cart) throw new NotFoundException('Cart Not Found');
    return this.repository.save(data);
  }

  async update(id: string, data: Partial<CartItem>): Promise<CartItem> {
    const cartItem: CartItem = await this.findById(id);
    Object.assign(cartItem, data);
    return this.repository.update(cartItem);
  }

  async delete(id: string): Promise<CartItem> {
    const cartItem: CartItem = await this.findById(id);
    return this.repository.delete(cartItem);
  }

  public static getInstance(): CartItemService {
    if (!CartItemService.instance) {
      CartItemService.instance = new CartItemService();
    }

    return CartItemService.instance;
  }
}
