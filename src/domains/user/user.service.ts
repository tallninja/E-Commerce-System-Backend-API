import { hashPassword } from '../../utils';
import { NotFoundException } from '../../exceptions';
import { User } from './user.entity';
import {
  FindOptionsRelations,
  FindOptionsWhere,
  UserRepository,
} from './user.repository';

export class UserService {
  public static instance: UserService;

  private readonly repository: UserRepository = UserRepository.getInstance();

  async findAll(): Promise<User[]> {
    return this.repository.findAll();
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findById(id);
    if (!user) throw new NotFoundException('User Not Found');
    return user;
  }

  async findOneBy(
    where: FindOptionsWhere,
    relations?: FindOptionsRelations
  ): Promise<User> {
    const user = await this.repository.findOneBy(where, relations);
    if (!user) throw new NotFoundException('User Not Found');
    return user;
  }

  async create(data: Partial<User>): Promise<User> {
    data.password = await hashPassword(data.password as string);
    return this.repository.save(data);
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const user = await this.findById(id);
    Object.assign(user, data);
    return this.repository.save(user);
  }

  async delete(id: string): Promise<User> {
    const user = await this.findById(id);
    return this.repository.delete(user);
  }

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }

    return UserService.instance;
  }
}
