import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { slugify } from '../utils';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category: Category =
      this.categoryRepository.create(createCategoryDto);
    category.slug = slugify(category.name);
    return this.categoryRepository.save(category);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findOne(id: string): Promise<Category> {
    const category: Category = await this.categoryRepository.findOneBy({ id });
    if (!category) throw new NotFoundException('Category Not Found');
    return category;
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category: Category = await this.findOne(id);
    Object.assign(category, updateCategoryDto);
    category.slug = slugify(category.name);
    return this.categoryRepository.save(category);
  }

  async remove(id: string): Promise<Category> {
    const category: Category = await this.findOne(id);
    return this.categoryRepository.softRemove(category);
  }
}
