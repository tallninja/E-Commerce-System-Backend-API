import { DbDataSource } from '../../data-source';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';

export interface FindOptionsWhere {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  createdAt?: Date;
}

export interface FindOptionsRelations {
  orders?: boolean;
  addresses?: boolean;
}

export class UserRepository {
  public static instance: UserRepository;

  private readonly dataSource: DataSource = DbDataSource.getInstance();
  private readonly repository: Repository<User> =
    this.dataSource.getRepository(User);

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async findBy(
    where: FindOptionsWhere,
    relations?: FindOptionsRelations
  ): Promise<User[]> {
    return this.repository.find({ where, relations });
  }

  async findById(id: string): Promise<User | null> {
    return this.repository.findOneBy({ id });
  }

  async findOneBy(
    where: FindOptionsWhere,
    relations?: FindOptionsRelations
  ): Promise<User | null> {
    return this.repository.findOne({ where, relations });
  }

  async save(data: Partial<User>): Promise<User> {
    const user: User = this.repository.create(data);
    return this.repository.save(user);
  }

  async update(user: User): Promise<User> {
    return this.repository.save(user);
  }

  async delete(user: User): Promise<User> {
    return this.repository.remove(user);
  }

  public static getInstance(): UserRepository {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository();
    }

    return UserRepository.instance;
  }
}
