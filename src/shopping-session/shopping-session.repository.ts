import { Service } from 'typedi';
import { ShoppingSession } from './shopping-session.entity';

export interface FindOptionsWhere {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FindOptionsRelations {
  user: boolean;
}

@Service()
export class ShoppingSessionRepository {
  findAll: () => Promise<ShoppingSession[]> = async () => {
    return await ShoppingSession.find();
  };

  findAllBy: (
    _w: Partial<FindOptionsWhere>,
    _r?: Partial<FindOptionsRelations>
  ) => Promise<ShoppingSession[]> = async (
    where: Partial<FindOptionsWhere>,
    relations?: Partial<FindOptionsRelations>
  ) => {
    return await ShoppingSession.find({ where, relations });
  };

  findOne: (
    _w: Partial<FindOptionsWhere>,
    _r?: Partial<FindOptionsRelations>
  ) => Promise<ShoppingSession | null> = async (
    where: Partial<FindOptionsWhere>,
    relations?: Partial<FindOptionsRelations>
  ) => {
    return await ShoppingSession.findOne({ where, relations });
  };

  save: (_s: ShoppingSession) => Promise<ShoppingSession> = async (
    _session: ShoppingSession
  ) => {
    const session: ShoppingSession = ShoppingSession.create(_session);
    return await session.save();
  };

  update: (_s: ShoppingSession) => Promise<ShoppingSession> = async (
    _session: ShoppingSession
  ) => {
    return await _session.save();
  };

  delete: (_s: ShoppingSession) => Promise<ShoppingSession> = async (
    _session: ShoppingSession
  ) => {
    return await _session.remove();
  };
}
