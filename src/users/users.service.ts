import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { hashPassword } from '../utils';
import { RolesService } from '../roles/roles.service';
import { Role } from '../roles/entities/role.entity';
import { UserRoles } from '../roles/entities/user.roles';

interface FindOptionsWhere {
  id?: string;
  email?: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly rolesService: RolesService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.findOneBy({ email: createUserDto.email });
    if (existingUser)
      throw new BadRequestException('User with that email already exists');

    const user: User = this.userRepository.create(createUserDto);

    // add default USER role to every new user
    const userRole: Role = await this.rolesService.findOneBy({
      name: UserRoles.USER,
    });
    user.roles = [userRole];
    user.password = await hashPassword(user.password);
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user: User = await this.userRepository.findOne({
      where: { id },
      relations: { roles: true },
    });
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

  async findAndFilter(filter: { roles: string }): Promise<User[]> {
    if (!filter) throw new BadRequestException('Missing filter query');
    const roles: string[] = filter.roles
      .split(',')
      .map((role) => role.toUpperCase());
    return this.findByRoles(roles);
  }

  async findByRoles(roles: string[]) {
    return this.userRepository.findBy({ roles: { name: In(roles) } });
  }
}
