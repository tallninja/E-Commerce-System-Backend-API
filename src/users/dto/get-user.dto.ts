import { Expose, Type } from 'class-transformer';
import { GetRoleDto } from 'src/roles/dto/get-role.dto';

export class GetUserDto {
  @Expose()
  id: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Expose()
  phone: string;

  @Expose()
  @Type(() => Array<GetRoleDto>)
  roles: GetRoleDto[];

  @Expose()
  createdAt: Date;
}
