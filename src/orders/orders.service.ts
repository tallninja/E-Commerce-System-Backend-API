import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    private readonly usersService: UsersService,
  ) {}

  async create(orderDetails: Partial<Order>): Promise<Order> {
    const user: User = await this.usersService.findOne(orderDetails.user.id);
    const order: Order = this.ordersRepository.create(orderDetails);
    order.user = user;
    return this.ordersRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return this.ordersRepository.find();
  }

  async findOne(id: string): Promise<Order> {
    const order: Order = await this.ordersRepository.findOneBy({ id });
    if (!order) throw new NotFoundException('Order Not Found');
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order: Order = await this.findOne(id);
    Object.assign(order, updateOrderDto);
    return this.ordersRepository.save(order);
  }

  async remove(id: string) {
    const order: Order = await this.findOne(id);
    return this.ordersRepository.remove(order);
  }
}
