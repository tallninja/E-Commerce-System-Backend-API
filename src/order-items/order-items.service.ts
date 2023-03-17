import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-item.entity';
import { DataSource, Repository } from 'typeorm';
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

    const orderItem: OrderItem = this.itemsRepository.create({
      ...createOrderItemDto,
      order,
      product,
    });
    return this.itemsRepository.save(orderItem);
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
