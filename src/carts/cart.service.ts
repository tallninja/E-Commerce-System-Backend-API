import { Service } from 'typedi';
import { CartRepository } from './cart.repository';
import { Cart } from './cart.entity';
import { User, UserService } from '../user';
import { NotFoundException } from '../exceptions';

@Service()
export class CartService {
  constructor(
    private repository: CartRepository,
    private userService: UserService
  ) {}

  async findAll(): Promise<Cart[]> {
    return await this.repository.findAll();
  }

  async findById(id: string): Promise<Cart> {
    const cart: Cart | null = await this.repository.findById(id);
    if (!cart) throw new NotFoundException('Cart Not Found');
    return cart;
  }

  async create(userId: string, cart: Partial<Cart>): Promise<Cart> {
    const user = await this.userService.findOne({ id: userId });
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

  async findUserCarts(userId: string): Promise<Cart[]> {
    const user = await this.userService.findOne({ id: userId });
    return await this.repository.findBy({ id: user.id });
  }
}
