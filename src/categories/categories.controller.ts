import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Res,
  Req,
  HttpStatus,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Response, Request } from 'express';
import { Serialize } from '../common';
import { GetCategoryDto } from './dto/get-category.dto';

@Controller('categories')
@Serialize(GetCategoryDto)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    const category: Category = await this.categoriesService.create(
      createCategoryDto,
    );
    res.setHeader('Location', `${req.path}/${category.id}`);
    return res.status(HttpStatus.CREATED).json(category);
  }

  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<Category> {
    return this.categoriesService.remove(id);
  }
}
