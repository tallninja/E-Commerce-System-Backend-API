import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Req,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { Request, Response } from 'express';
import { OrderItem } from './entities/order-item.entity';
import { RequireAuth, RequiredRoles } from 'src/common';
import { UserRoles } from '../roles/entities/user.roles';

@Controller('order-items')
@RequireAuth()
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @Post()
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createOrderItemDto: CreateOrderItemDto,
  ) {
    const orderItem: OrderItem = await this.orderItemsService.create(
      createOrderItemDto,
    );
    res.setHeader('Location', `${req.path}/${orderItem.id}`);
    return res.status(HttpStatus.CREATED).json(orderItem);
  }

  @Get()
  @RequiredRoles(UserRoles.MANAGER, UserRoles.ADMIN)
  async findAll(): Promise<OrderItem[]> {
    return this.orderItemsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<OrderItem> {
    return this.orderItemsService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<OrderItem> {
    return this.orderItemsService.remove(id);
  }
}
