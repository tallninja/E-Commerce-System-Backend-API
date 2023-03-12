import { NotFoundException } from '../../exceptions';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';

export class ProductService {
  public static instance: ProductService;

  private readonly repository: ProductRepository =
    ProductRepository.getInstance();

  async findAll(): Promise<Product[]> {
    return this.repository.findAll();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.repository.findById(id);
    if (!product) throw new NotFoundException('Product Not Found');
    return product;
  }

  async create(data: Partial<Product>): Promise<Product> {
    return this.repository.save(data);
  }

  async update(id: string, data: Partial<Product>): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, data);
    return this.repository.save(product);
  }

  async delete(id: string): Promise<Product> {
    const product = await this.findOne(id);
    return this.repository.delete(product);
  }

  public static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }

    return ProductService.instance;
  }
}
