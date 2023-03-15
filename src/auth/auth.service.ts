import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { verifyPassword } from '../utils';
import { User } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async registerUser(registerDto: RegisterDto): Promise<User> {
    return this.usersService.create(registerDto);
  }

  async validateUser(loginDto: LoginDto): Promise<User> {
    const { email, password } = loginDto;
    const user: User = await this.usersService.findOneBy({ email });
    if (!user) throw new UnauthorizedException('Invalid email or password');
    const passwordIsValid = await verifyPassword(password, user.password);
    if (!passwordIsValid)
      throw new UnauthorizedException('Invalid email or password');
    return user;
  }
}
