import { Service } from 'typedi';
import { BadRequestException, NotFoundException } from '../../exceptions';
import { hashPassword } from '../../utils';
import { User } from './user.entity';

interface FindOptionsFilters {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

interface FindOptionsRelations {
  orders: boolean;
}

@Service()
export class UserService {
  find = async (
    filters?: Partial<FindOptionsFilters>,
    relations?: Partial<FindOptionsRelations>
  ) => {
    try {
      const users = await User.find({ where: filters, relations });
      return users;
    } catch (error) {
      throw error;
    }
  };

  findOne = async (
    filters?: Partial<FindOptionsFilters>,
    relations?: Partial<FindOptionsRelations>
  ) => {
    try {
      const user = await User.findOne({ where: filters, relations });
      if (!user) throw new NotFoundException('User Not Found');
      return user;
    } catch (error) {
      throw error;
    }
  };

  create = async (data: Partial<User>) => {
    try {
      const user = User.create(data as User);
      const existingUser = await User.findOne({ where: { email: data.email } });
      if (existingUser) throw new BadRequestException('Users Already Exists');
      user.password = await hashPassword(user.password);
      return await user.save();
    } catch (error) {
      throw error;
    }
  };

  update = async (id: string, data: Partial<User>) => {
    try {
      const user = await this.findOne({ id });
      Object.assign(user, data);
      return await user.save();
    } catch (error) {
      throw error;
    }
  };

  delete = async (id: string) => {
    try {
      const user = await this.findOne({ id });
      return await user.remove();
    } catch (error) {
      throw error;
    }
  };
}
