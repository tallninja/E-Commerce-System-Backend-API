import { IsNumber, IsObject, IsOptional } from 'class-validator';
import { GetUserDto } from '../../users/dto/get-user.dto';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCartDto {
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  total: number;

  @IsObject()
  @Type(() => PartialType(GetUserDto))
  user: GetUserDto;
}
