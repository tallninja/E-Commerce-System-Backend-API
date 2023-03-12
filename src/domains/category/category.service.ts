import { NotFoundException } from '../../exceptions';
import { Category } from './category.entity';
import { slugify } from '../../utils';
import { CategoryRepository } from './category.repository';

export class CategoryService {
  public static instance: CategoryService;

  private readonly repository: CategoryRepository =
    CategoryRepository.getInstance();

  async findAll(): Promise<Category[]> {
    return this.repository.findAll();
  }

  async findById(id: string): Promise<Category> {
    const category: Category | null = await this.repository.findById(id);
    if (!category) throw new NotFoundException('Category Not Found');
    return category;
  }

  async create(category: Partial<Category>): Promise<Category> {
    category.slug = slugify(category.name as string);
    return this.repository.save(category);
  }

  async update(id: string, data: Partial<Category>): Promise<Category> {
    const category: Category = await this.findById(id);
    Object.assign(category, data);
    return this.repository.update(category);
  }

  async delete(id: string): Promise<Category> {
    const category: Category = await this.findById(id);
    return this.repository.delete(category);
  }

  public static getInstance(): CategoryService {
    if (!CategoryService.instance) {
      CategoryService.instance = new CategoryService();
    }

    return CategoryService.instance;
  }
}
