import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CartItem } from './entities/cart-item.entity';
import { RequireAuth, RequiredRoles, Serialize } from '../common';
import { GetCartItemDto } from './dto/get-cart-item.dto';
import { UserRoles } from '../roles/entities/user.roles';

@Controller('cart-items')
@Serialize(GetCartItemDto)
@RequireAuth()
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {}

  @Post()
  async create(
    @Body() createCartItemDto: CreateCartItemDto,
  ): Promise<CartItem> {
    return this.cartItemsService.create(createCartItemDto);
  }

  @Get()
  async findAll(): Promise<CartItem[]> {
    return this.cartItemsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<CartItem> {
    return this.cartItemsService.findOne(id);
  }

  @Patch(':id')
  @RequiredRoles(UserRoles.USER)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ): Promise<CartItem> {
    return this.cartItemsService.update(id, updateCartItemDto);
  }

  @Delete(':id')
  @RequiredRoles(UserRoles.USER)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<CartItem> {
    return this.cartItemsService.remove(id);
  }
}
