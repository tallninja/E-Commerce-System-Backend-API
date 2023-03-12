import { Request, Response, NextFunction } from 'express';
import { StatusCodes as SC } from 'http-status-codes';
import { UserService } from './user.service';
import { User } from './user.entity';

export class UserController {
  private service: UserService = UserService.getInstance();

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user: User = await this.service.create(req.body);
      return res.status(SC.CREATED).json(user);
    } catch (error) {
      return next(error);
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users: User[] = await this.service.findAll();
      return res.status(SC.OK).json(users);
    } catch (error) {
      return next(error);
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user: User = await this.service.findById(req.params.id);
      return res.status(SC.OK).json(user);
    } catch (error) {
      return next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedUser: User = await this.service.update(
        req.params.id,
        req.body
      );
      return res.status(SC.OK).json(updatedUser);
    } catch (error) {
      return next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user: User = await this.service.delete(req.params.id);
      return res.status(SC.OK).json(user);
    } catch (error) {
      return next(error);
    }
  }
}
