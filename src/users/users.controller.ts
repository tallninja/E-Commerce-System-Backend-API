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
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';
import { User } from './entities/user.entity';
import { RequiredRoles, Serialize } from 'src/common';
import { GetUserDto } from './dto/get-user.dto';
import { UserRoles } from 'src/roles/entities/user.roles';

@Controller('users')
@Serialize(GetUserDto)
// @RequiredRoles(UserRoles.ADMIN)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createUserDto: CreateUserDto,
  ) {
    const user: User = await this.usersService.create(createUserDto);
    res.setHeader('Location', `${req.path}/${user.id}`);
    return res.status(HttpStatus.CREATED).json(user);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('/filter')
  async findAndFilter(@Query() query: { roles: string }) {
    return this.usersService.findAndFilter(query);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.usersService.remove(id);
  }
}
