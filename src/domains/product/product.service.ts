import { Service } from 'typedi';
import { slugify } from '../../utils';
import { BadRequestException, NotFoundException } from '../../exceptions';
import { Product } from './product.entity';
import { InventoryService } from '../inventory';
import { CategoryService } from '../category';

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

@Service()
export class ProductService {
  constructor(
    private ivService: InventoryService,
    private categoryService: CategoryService
  ) {}

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

      // check if the product slug is unique
      const slug = slugify(product.name);
      const existingProduct = await Product.findOne({ where: { slug } });
      if (existingProduct)
        throw new BadRequestException('Product Already Exists');

      // check if inventory exists
      const inventory = await this.ivService.findOne({
        id: product.inventory as unknown as string,
      });

      // check if category exists
      const category = await this.categoryService.findOne({
        id: product.category as unknown as string,
      });

      // save product
      product.inventory = inventory;
      product.category = category;
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
      product.slug = slugify(product.name);
      return await product.save();
    } catch (error) {
      throw error;
    }
  };

  delete = async (id: string) => {
    try {
      const product = await this.findOne({ id }, { inventory: true });
      return await product.remove();
    } catch (error) {
      throw error;
    }
  };
}
