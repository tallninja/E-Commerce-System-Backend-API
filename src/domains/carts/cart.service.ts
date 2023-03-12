import { CartRepository } from './cart.repository';
import { Cart } from './cart.entity';
import { UserService } from '../user';
import { NotFoundException } from '../../exceptions';

export class CartService {
  public static instance: CartService;

  private repository: CartRepository = CartRepository.getInstance();
  private userService: UserService = UserService.getInstance();

  async findAll(): Promise<Cart[]> {
    return await this.repository.findAll();
  }

  async findById(id: string): Promise<Cart> {
    const cart: Cart | null = await this.repository.findById(id);
    if (!cart) throw new NotFoundException('Cart Not Found');
    return cart;
  }

  async create(userId: string, cart: Partial<Cart>): Promise<Cart> {
    const user = await this.userService.findById(userId);
    cart.user = user;
    return await this.repository.save(cart);
  }

  async update(id: string, cartData: Partial<Cart>): Promise<Cart> {
    const cart = await this.findById(id);
    Object.assign(cart, cartData);
    return await this.repository.update(cart);
  }

  async delete(id: string): Promise<Cart> {
    const cart = await this.findById(id);
    return await this.repository.delete(cart);
  }

  public static getInstance(): CartService {
    if (!CartService.instance) {
      CartService.instance = new CartService();
    }

    return CartService.instance;
  }
}
