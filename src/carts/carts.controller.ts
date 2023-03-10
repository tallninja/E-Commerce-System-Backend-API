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
  Put,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';
import { Request, Response } from 'express';
import { Serialize } from 'src/common';
import { GetCartDto } from './dto/get-cart.dto';

@Controller('carts')
@Serialize(GetCartDto)
export class CartsController {
  constructor(private readonly cartService: CartsService) {}

  @Post()
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createCartDto: CreateCartDto,
  ) {
    const cart: Cart = await this.cartService.create(createCartDto);
    const location: string = `${req.path}/${cart.id}`;
    res.setHeader('Location', location);
    return res.status(HttpStatus.CREATED).json(cart);
  }

  @Get()
  async findAll(): Promise<Cart[]> {
    return this.cartService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Cart> {
    return this.cartService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCartDto: UpdateCartDto,
  ): Promise<Cart> {
    return this.cartService.update(id, updateCartDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<Cart> {
    return this.cartService.remove(id);
  }
}
