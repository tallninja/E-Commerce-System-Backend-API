import { Service } from 'typedi';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes as SC } from 'http-status-codes';
import { ShoppingSessionService } from './shopping-session.service';
import { ShoppingSession } from './shopping-session.entity';

@Service()
export class ShoppingSessionController {
  constructor(private service: ShoppingSessionService) {}

  getSessions = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sessions: ShoppingSession[] = await this.service.findAll();
      return res.status(SC.OK).json(sessions);
    } catch (error) {
      return next(error);
    }
  };

  getSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session: ShoppingSession = await this.service.findOneById(
        req.params.id
      );
      return res.status(SC.OK).json(session);
    } catch (error) {
      return next(error);
    }
  };

  createSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await this.service.createSession(
        req.body as Partial<ShoppingSession>
      );
      res.setHeader('Location', `${req.path}/${session.id}`);
      return res.status(SC.CREATED).json(session);
    } catch (error) {
      return next(error);
    }
  };

  updateSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session: ShoppingSession = await this.service.updateSession(
        req.params.id as string,
        req.body as ShoppingSession
      );
      return res.status(SC.OK).json(session);
    } catch (error) {
      return next(error);
    }
  };

  deleteSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.deleteSession(req.params.id as string);
      return res.status(SC.OK).json({ info: 'Session deleted successfully' });
    } catch (error) {
      return next(error);
    }
  };
}
