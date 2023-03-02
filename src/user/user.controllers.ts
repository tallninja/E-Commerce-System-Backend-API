import { NextFunction, Request, Response } from 'express';
import { StatusCodes as SC } from 'http-status-codes';
import { UserService } from './user.service';

export class UserController {
  private service = new UserService();

  getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.service.find();
      return res.status(SC.OK).json(users);
    } catch (error) {
      return next(error);
    }
  };

  getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.service.findOne({ id: req.params.id });
      return res.status(SC.OK).json(user);
    } catch (error) {
      return next(error);
    }
  };

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newUser = await this.service.create(req.body);
      return res.status(SC.OK).json(newUser);
    } catch (error) {
      return next(error);
    }
  };

  editUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedUser = await this.service.update(req.params.id, req.body);
      return res.status(SC.OK).json(updatedUser);
    } catch (error) {
      return next(error);
    }
  };

  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.delete(req.params.id);
      return res.status(SC.OK).json({ info: 'User deleted successfully' });
    } catch (error) {
      return next(error);
    }
  };
}
