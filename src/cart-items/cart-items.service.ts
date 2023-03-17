import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from './entities/cart-item.entity';
import { DataSource, QueryRunner, Repository } from 'typeorm';
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
    private readonly dataSource: DataSource,
  ) {}

  async create(createCartItemDto: CreateCartItemDto): Promise<CartItem> {
    const cart: Cart = await this.cartsService.findOne(createCartItemDto.cart);
    const product: Product = await this.productsService.findOne(
      createCartItemDto.product,
    );

    // calculate the total amount in cart
    const total: number =
      cart.total + product.price * createCartItemDto.quantity;
    cart.total = total;

    let cartItem: CartItem = this.cartItemRepository.create({
      ...createCartItemDto,
      cart,
      product,
    });

    // use a DB transaction to ensure that the cart item and cart are updated appropriately
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(cart);
      cartItem = await queryRunner.manager.save(cartItem);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Transaction Failed');
    } finally {
      await queryRunner.release();
    }

    return cartItem;
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
    let cartItem: CartItem = await this.findOne(id, {
      cart: true,
      product: true,
    });

    const cart: Cart = await this.cartsService.findOne(cartItem.cart.id);
    const product: Product = await this.productsService.findOne(
      cartItem.product.id,
    );

    let total: number = cart.total;

    if (updateCartItemDto.quantity < cartItem.quantity) {
      const diff: number = cartItem.quantity - updateCartItemDto.quantity;
      total -= product.price * diff;
    }

    if (updateCartItemDto.quantity > cartItem.quantity) {
      const diff: number = updateCartItemDto.quantity - cartItem.quantity;
      total += product.price * diff;
    }

    cart.total = total;
    Object.assign(cartItem, updateCartItemDto);

    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(cart);
      cartItem = await queryRunner.manager.save(cartItem);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Transaction Failed');
    } finally {
      await queryRunner.release();
    }

    return cartItem;
  }

  async remove(id: string): Promise<CartItem> {
    let cartItem: CartItem = await this.findOne(id, {
      cart: true,
      product: true,
    });
    const cart: Cart = await this.cartsService.findOne(cartItem.cart.id);
    const product: Product = await this.productsService.findOne(
      cartItem.product.id,
    );

    // decrease the total amount in cart
    cart.total -= product.price * cartItem.quantity;

    // Create a query runner used for perform queries on a single database connection.
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

    // use database connection from the connection pool
    await queryRunner.connect();

    // start transaction
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(cart);
      cartItem = await queryRunner.manager.save(cartItem);
    } catch (error) {
      // if transaction fails then rollback the changes
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Transaction Failed');
    } finally {
      // release the used database connection
      await queryRunner.release();
    }

    return cartItem;
  }
}
