import { PassportSerializer } from '@nestjs/passport';
import { User } from '../users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: User, done: Function) {
    done(null, { id: user.id });
  }

  async deserializeUser(payload: { id: string }, done: Function) {
    const user: User = await this.usersService.findOne(payload.id);
    done(null, user);
  }
}
