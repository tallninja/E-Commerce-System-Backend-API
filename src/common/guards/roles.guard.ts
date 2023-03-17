import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoles } from '../../roles/entities/user.roles';
import { User } from '../../users/entities/user.entity';
import { Role } from '../../roles/entities/role.entity';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles: string[] = this.reflector.getAllAndOverride<
      UserRoles[]
    >('ROLES', [context.getHandler(), context.getClass()]);

    if (!requiredRoles) return true;

    const req: Request = context.switchToHttp().getRequest();

    if (!req.isAuthenticated()) return false;

    const user: User = req.user as User;

    return requiredRoles.some(
      (requiredRole) =>
        user.roles?.filter((userRole) => userRole.name === requiredRole).length,
    );
  }
}
