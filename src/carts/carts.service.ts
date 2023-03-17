import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    private readonly userService: UsersService,
  ) {}

  async create(cartData: Partial<Cart>): Promise<Cart> {
    const user: User = await this.userService.findOne(cartData.user.id);

    const existingCart: Cart = await this.cartRepository.findOneBy({
      user: { id: user.id },
    });
    if (existingCart) throw new BadRequestException('Cart Already Exists');

    const cart: Cart = this.cartRepository.create(cartData);
    cart.user = user;
    return this.cartRepository.save(cart);
  }

  async findAll(): Promise<Cart[]> {
    return this.cartRepository.find();
  }

  async findOne(id: string): Promise<Cart> {
    const cart: Cart = await this.cartRepository.findOne({
      where: { id },
      relations: { items: true },
    });
    if (!cart) throw new NotFoundException('Cart Not Found');
    return cart;
  }

  async update(id: string, updateCartDto: UpdateCartDto): Promise<Cart> {
    const cart: Cart = await this.findOne(id);
    Object.assign(cart, updateCartDto);
    return this.cartRepository.save(cart);
  }

  async remove(id: string): Promise<Cart> {
    const cart: Cart = await this.findOne(id);
    return this.cartRepository.remove(cart);
  }
}
