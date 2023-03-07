import { Service } from 'typedi';
import { BadRequestException, NotFoundException } from '../exceptions';
import { ShoppingSession } from './shopping-session.entity';
import { ShoppingSessionRepository } from './shopping-session.repository';
import { UserService } from '../user';

@Service()
export class ShoppingSessionService {
  constructor(
    private repository: ShoppingSessionRepository,
    private userService: UserService
  ) {}

  findAll: () => Promise<ShoppingSession[]> = async () => {
    return await this.repository.findAll();
  };

  findOneById: (_id: string) => Promise<ShoppingSession> = async (
    id: string
  ) => {
    try {
      const session = await this.repository.findOne({ id });
      if (!session) throw new NotFoundException('Shopping Session Not Found');
      return session;
    } catch (error) {
      throw error;
    }
  };

  createSession: (_s: Partial<ShoppingSession>) => Promise<ShoppingSession> =
    async (_session: Partial<ShoppingSession>) => {
      try {
        if (!_session.user) throw new BadRequestException('User not found');
        const user = await this.userService.findOne({ id: _session.user.id });
        if (!user) throw new BadRequestException('User Not Found');
        return await this.repository.save(_session as ShoppingSession);
      } catch (error) {
        throw error;
      }
    };

  updateSession: (
    _id: string,
    _s: Partial<ShoppingSession>
  ) => Promise<ShoppingSession> = async (
    id: string,
    _session: Partial<ShoppingSession>
  ) => {
    try {
      const session = await this.findOneById(id);
      Object.assign(session, _session);
      return await this.repository.update(session);
    } catch (error) {
      throw error;
    }
  };

  deleteSession: (id: string) => Promise<ShoppingSession> = async (
    id: string
  ) => {
    try {
      const session = await this.findOneById(id);
      return await this.repository.delete(session);
    } catch (error) {
      throw error;
    }
  };
}
