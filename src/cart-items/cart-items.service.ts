import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from './entities/cart-item.entity';
import { Repository } from 'typeorm';
import { CartsService } from 'src/carts/carts.service';
import { Cart } from '../carts/entities/cart.entity';
import { ProductsService } from '../products/products.service';
import { Product } from 'src/products/entities/product.entity';

export interface FindOptionsRelations {
  cart?: boolean;
  product?: boolean;
}

@Injectable()
export class CartItemsService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    private readonly cartsService: CartsService,
    private readonly productsService: ProductsService,
  ) {}

  async create(createCartItemDto: CreateCartItemDto): Promise<CartItem> {
    const cartItem: CartItem =
      this.cartItemRepository.create(createCartItemDto);
    const cart: Cart = await this.cartsService.findOne(cartItem.cart.id);
    const product: Product = await this.productsService.findOne(
      cartItem.product.id,
    );

    // increase the total in cart
    const total = cart.total + product.price * cartItem.quantity;
    this.cartsService.update(cart.id, { total });

    return this.cartItemRepository.save(cartItem);
  }

  async findAll(): Promise<CartItem[]> {
    return this.cartItemRepository.find();
  }

  async findOne(
    id: string,
    relations?: FindOptionsRelations,
  ): Promise<CartItem> {
    const cartItem: CartItem = await this.cartItemRepository.findOne({
      where: { id },
      relations,
    });
    if (!cartItem) throw new NotFoundException('Cart Item Not Found');
    return cartItem;
  }

  async update(
    id: string,
    updateCartItemDto: UpdateCartItemDto,
  ): Promise<CartItem> {
    const cartItem: CartItem = await this.findOne(id);
    Object.assign(cartItem, updateCartItemDto);
    return this.cartItemRepository.save(cartItem);
  }

  async remove(id: string): Promise<CartItem> {
    const cartItem: CartItem = await this.findOne(id, {
      cart: true,
      product: true,
    });
    const cart: Cart = await this.cartsService.findOne(cartItem.cart.id);
    const product: Product = await this.productsService.findOne(
      cartItem.product.id,
    );

    // increase the total in cart
    const total = cart.total - product.price * cartItem.quantity;
    this.cartsService.update(cart.id, { total });

    return this.cartItemRepository.remove(cartItem);
  }
}
