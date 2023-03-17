import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { OrderItem } from './entities/order-item.entity';
import { OrdersService } from '../orders/orders.service';
import { Order } from '../orders/entities/order.entity';
import { ProductsService } from '../products/products.service';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly itemsRepository: Repository<OrderItem>,
    private readonly ordersService: OrdersService,
    private readonly productsService: ProductsService,
    private readonly dataSource: DataSource,
  ) {}

  async create(createOrderItemDto: CreateOrderItemDto): Promise<OrderItem> {
    const order: Order = await this.ordersService.findOne(
      createOrderItemDto.order,
    );
    const product: Product = await this.productsService.findOne(
      createOrderItemDto.product,
    );

    let orderItem: OrderItem = this.itemsRepository.create({
      ...createOrderItemDto,
      order,
      product,
    });

    const remainingQuantity: number = product.qty - orderItem.quantity;

    if (remainingQuantity < 0)
      throw new BadRequestException('Not Enough Products In Stock');

    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      orderItem = await queryRunner.manager.save(orderItem);
      await queryRunner.manager.save({
        ...product,
        qty: remainingQuantity,
      } as Product);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Transaction Failed');
    } finally {
      await queryRunner.release();
    }

    return orderItem;
  }

  async findAll(): Promise<OrderItem[]> {
    return this.itemsRepository.find();
  }

  async findOne(id: string): Promise<OrderItem> {
    const orderItem: OrderItem = await this.itemsRepository.findOneBy({ id });
    if (!orderItem) throw new NotFoundException('Order Item Not Found');
    return orderItem;
  }

  async remove(id: string): Promise<OrderItem> {
    const orderItem: OrderItem = await this.findOne(id);
    return this.itemsRepository.remove(orderItem);
  }
}
