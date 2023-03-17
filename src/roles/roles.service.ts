import { Injectable, LoggerService, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { UserRoles } from './entities/user.roles';

interface FindOptionsWhere {
  id?: string;
  name?: UserRoles;
}

interface FindOptionsRelations {
  users?: boolean;
}

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly rolesRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const role: Role = this.rolesRepository.create(createRoleDto);
    return this.rolesRepository.save(role);
  }

  async findAll(): Promise<Role[]> {
    return this.rolesRepository.find();
  }

  async findOne(id: string): Promise<Role> {
    const role: Role = await this.rolesRepository.findOneBy({ id });
    if (!role) throw new NotFoundException('Role Not Found');
    return role;
  }

  async remove(id: string): Promise<Role> {
    const role: Role = await this.findOne(id);
    return this.rolesRepository.remove(role);
  }

  async findOneBy(
    where: FindOptionsWhere,
    relations?: FindOptionsRelations,
  ): Promise<Role> {
    return this.rolesRepository.findOne({ where, relations });
  }

  async onModuleInit() {
    Object.values(UserRoles).forEach(async (roleName: string) => {
      const role: Role = await this.findOneBy({
        name: UserRoles[roleName],
      });
      if (!role) {
        try {
          const newRole: Role = await this.create({
            name: UserRoles[roleName],
          });
          console.log(`Created ${newRole.name} role.`);
        } catch (err) {}
      }
    });
  }
}
