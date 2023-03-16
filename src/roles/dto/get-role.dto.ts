import { Expose } from 'class-transformer';
import { UserRoles } from '../entities/user.roles';

export class GetRoleDto {
  @Expose()
  id: string;

  @Expose()
  name: UserRoles;
}
