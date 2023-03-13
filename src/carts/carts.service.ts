import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
  ) {}

  async create(createCartDto: CreateCartDto): Promise<Cart> {
    const cart: Cart = this.cartRepository.create(createCartDto);
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
