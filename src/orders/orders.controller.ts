import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { RequireAuth, RequiredRoles, Serialize } from '../common';
import { Request, Response } from 'express';
import { Order } from './entities/order.entity';
import { User } from '../users/entities/user.entity';
import { UserRoles } from 'src/roles/entities/user.roles';
import { GetOrderDto } from './dto/get-order.dto';

@Controller('orders')
@Serialize(GetOrderDto)
@RequireAuth()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    const order: Order = await this.ordersService.create({
      ...createOrderDto,
      user: req.user as User,
    });
    res.setHeader('Location', `${req.path}/${order.id}`);
    return res.status(HttpStatus.CREATED).json(order);
  }

  @Get()
  @RequiredRoles(UserRoles.MANAGER, UserRoles.ADMIN)
  async findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Order> {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<Order> {
    return this.ordersService.remove(id);
  }
}
