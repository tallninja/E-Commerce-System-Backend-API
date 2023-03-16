import { Type } from 'class-transformer';
import { UserRoles } from '../entities/user.roles';
import { IsEnum } from 'class-validator';

export class CreateRoleDto {
  @IsEnum(UserRoles)
  name: UserRoles;
}
