import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { slugify } from 'src/utils';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product: Product = this.productRepository.create(createProductDto);
    product.slug = slugify(product.name);
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
    Object.assign(product, updateProductDto);
    product.slug = slugify(product.name);
    return this.productRepository.save(product);
  }

  async remove(id: string): Promise<Product> {
    const product = await this.findOne(id);
    return this.productRepository.softRemove(product);
  }
}
