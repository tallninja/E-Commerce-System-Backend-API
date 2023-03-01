import { NextFunction, Request, Response } from 'express';
import { StatusCodes as SC } from 'http-status-codes';
import { User } from './user.entity';
import { hashPassword } from '../utils';
import { BadRequestException, NotFoundException } from '../exceptions';

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    return res.status(SC.OK).json(users);
  } catch (error) {
    return next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    if (!user) throw new NotFoundException('User Not Found');
    return res.status(SC.OK).json(user);
  } catch (error) {
    return next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = User.create(req.body as User);

    const existingUser = await User.findOneBy({ email: user.email });
    if (existingUser) throw new BadRequestException('User Already Exists');

    user.password = await hashPassword(user.password);
    const newUser = await user.save();
    return res.status(SC.OK).json(newUser);
  } catch (error) {
    return next(error);
  }
};

export const editUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOneBy({ id: req.params.id });
    if (!user) throw new NotFoundException('User Not Found');
    Object.assign(user, req.body);
    const updatedUser = await user.save();
    return res.status(SC.OK).json(updatedUser);
  } catch (error) {
    return next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOneBy({ id: req.params.id });
    if (!user) throw new NotFoundException('User Not Found');
    await User.delete({ id: user.id });
    return res.status(SC.OK).json({ info: 'User deleted successfully' });
  } catch (error) {
    return next(error);
  }
};
