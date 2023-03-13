import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { In, Repository } from 'typeorm';
import { slugify } from 'src/utils';
import { Category } from '../categories/entities/category.entity';

interface FindOneWhere {
  name?: string;
  slug?: string;
  sku?: string;
}

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    let categories: Category[] = [];

    if (createProductDto.categories)
      categories = await this.categoryRepository.findBy({
        slug: In(createProductDto?.categories),
      });

    const product: Product = this.productRepository.create({
      ...createProductDto,
      categories,
    });

    // update the slug
    product.slug = slugify(product.name);

    const existingProduct = await this.findOneBy({
      name: product.name,
      slug: product.slug,
    });

    if (existingProduct)
      throw new BadRequestException('Product Already Exists');

    return this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: string): Promise<Product> {
    const product: Product = await this.productRepository.findOneBy({ id });
    if (!product) throw new NotFoundException('Product Not Found');
    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(id);
    const categories: Category[] = await this.categoryRepository.findBy({
      slug: In(updateProductDto?.categories),
    });
    Object.assign(product, { ...updateProductDto, categories });
    product.slug = slugify(product.name);
    return this.productRepository.save(product);
  }

  async remove(id: string): Promise<Product> {
    const product = await this.findOne(id);
    return this.productRepository.softRemove(product);
  }

  async findOneBy(where: FindOneWhere): Promise<Product | null> {
    return this.productRepository.findOneBy(where);
  }

  async findAndFilter(filter: { category: string }): Promise<Product[]> {
    const categories: string[] = filter.category.split(',');
    return this.productRepository.findBy({
      categories: { slug: In(categories) },
    });
  }
}
