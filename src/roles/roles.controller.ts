import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Req,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entities/role.entity';
import { Request, Response } from 'express';
import { RequiredRoles, Serialize } from '../common';
import { GetRoleDto } from './dto/get-role.dto';
import { UserRoles } from './entities/user.roles';

@Controller('roles')
@Serialize(GetRoleDto)
@RequiredRoles(UserRoles.ADMIN)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createRoleDto: CreateRoleDto,
  ) {
    const role: Role = await this.rolesService.create(createRoleDto);
    res.setHeader('Location', `${req.path}/${role.id}`);
    return res.status(HttpStatus.CREATED).json(role);
  }

  @Get()
  async findAll(): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Role> {
    return this.rolesService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<Role> {
    return this.rolesService.remove(id);
  }
}
