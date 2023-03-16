import { SetMetadata } from '@nestjs/common';
import { UserRoles } from '../../roles/entities/user.roles';

export const RequiredRoles = (...roles: UserRoles[]) =>
  SetMetadata('ROLES', roles);
