import slugify from 'slugify';
import { BadRequestException, NotFoundException } from '../exceptions';
import { Product } from './product.entity';

interface FindOptionsFilters {
  id: string;
  name: string;
  slug: string;
  sku: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

interface FindOptionsRelations {
  category: boolean;
  inventory: boolean;
  discount: boolean;
}

export class ProductService {
  find = async (
    filters?: Partial<FindOptionsFilters>,
    relations?: Partial<FindOptionsRelations>
  ) => {
    try {
      const products = await Product.find({ where: filters, relations });
      return products;
    } catch (error) {
      throw error;
    }
  };

  findOne = async (
    filters?: Partial<FindOptionsFilters>,
    relations?: Partial<FindOptionsRelations>
  ) => {
    try {
      const product = await Product.findOne({ where: filters, relations });
      if (!product) throw new NotFoundException('Product Not Found');
      return product;
    } catch (error) {
      throw error;
    }
  };

  create = async (data: Partial<Product>) => {
    try {
      const product = Product.create(data as Product);
      const slug = slugify(product.name);
      const existingProduct = await this.findOne({ slug });
      if (existingProduct)
        throw new BadRequestException('Product Already Exists');
      product.slug = slug;
      return await product.save();
    } catch (error) {
      throw error;
    }
  };

  update = async (id: string, data: Partial<Product>) => {
    try {
      const product = await this.findOne({ id });
      Object.assign(product, data);
      return await product.save();
    } catch (error) {
      throw error;
    }
  };

  delete = async (id: string) => {
    try {
      const product = await this.findOne({ id });
      return await product.remove();
    } catch (error) {
      throw error;
    }
  };
}
