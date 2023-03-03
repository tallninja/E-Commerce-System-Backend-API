import { Service } from 'typedi';
import { BadRequestException, NotFoundException } from '../exceptions';
import { Category } from './category.entity';
import { slugify } from '../utils';

interface FindOptionsFilters {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

interface FindOptionsRelations {
  products: boolean;
}

@Service()
export class CategoryService {
  find = async (
    filters?: Partial<FindOptionsFilters>,
    relations?: Partial<FindOptionsRelations>
  ) => {
    try {
      const categories = await Category.find({ where: filters, relations });
      return categories;
    } catch (error) {
      throw error;
    }
  };

  findOne = async (
    filters?: Partial<FindOptionsFilters>,
    relations?: Partial<FindOptionsRelations>
  ) => {
    try {
      const category = await Category.findOne({ where: filters, relations });
      if (!category) throw new NotFoundException('Category Not Found');
      return category;
    } catch (error) {
      throw error;
    }
  };

  create = async (data: Partial<Category>) => {
    try {
      const category = Category.create(data as Category);
      const existingCategory = await Category.findOne({
        where: {
          name: category.name,
          slug: category.slug,
        },
      });
      if (existingCategory)
        throw new BadRequestException('Category Already Exists');
      category.slug = slugify(category.name);
      return await category.save();
    } catch (error) {
      throw error;
    }
  };

  update = async (id: string, data: Partial<Category>) => {
    try {
      const category = await this.findOne({ id });
      Object.assign(category, data);
      return await category.save();
    } catch (error) {
      throw error;
    }
  };

  delete = async (id: string) => {
    try {
      const category = await this.findOne({ id });
      return await category.remove();
    } catch (error) {
      throw error;
    }
  };
}
