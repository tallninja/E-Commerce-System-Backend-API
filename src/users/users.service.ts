import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashPassword } from '../utils';

interface FindOptionsWhere {
  id?: string;
  email?: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.findOneBy({ email: createUserDto.email });
    if (existingUser)
      throw new BadRequestException('User with that email already exists');

    const user: User = this.userRepository.create(createUserDto);
    user.password = await hashPassword(user.password);
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user: User = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User Not Found');
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = await this.findOne(id);
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: string): Promise<User> {
    const user: User = await this.findOne(id);
    return this.userRepository.softRemove(user);
  }

  async findOneBy(where: FindOptionsWhere): Promise<User | null> {
    return this.userRepository.findOne({ where });
  }
}
