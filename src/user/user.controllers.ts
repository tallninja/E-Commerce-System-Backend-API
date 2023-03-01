import { Request, Response } from 'express';
import { StatusCodes as SC } from 'http-status-codes';
import { User } from './user.entity';
import { hashPassword } from '../utils';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    return res.status(SC.OK).json(users);
  } catch (error) {
    console.error(error);
    return res
      .status(SC.INTERNAL_SERVER_ERROR)
      .json({ error: 'Could not fetch users' });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    if (!user) return res.status(SC.NOT_FOUND).json({ eror: 'User Not Found' });
    return res.status(SC.OK).json(user);
  } catch (error) {
    console.error(error);
    return res
      .status(SC.INTERNAL_SERVER_ERROR)
      .json({ error: 'Could not fetch user' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = User.create(req.body as User);

    const existingUser = await User.findOneBy({ email: user.email });
    if (existingUser)
      return res.status(SC.BAD_REQUEST).json({ error: 'User already exists' });

    user.password = await hashPassword(user.password);
    const newUser = await user.save();
    return res.status(SC.OK).json(newUser);
  } catch (error) {
    console.error(error);
    return res
      .status(SC.INTERNAL_SERVER_ERROR)
      .json({ error: 'Could not fetch user' });
  }
};

export const editUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneBy({ id: req.params.id });
    if (!user)
      return res.status(SC.NOT_FOUND).json({ error: 'User not found' });
    Object.assign(user, req.body);
    const updatedUser = await user.save();
    return res.status(SC.OK).json(updatedUser);
  } catch (error) {
    console.error(error);
    return res
      .status(SC.INTERNAL_SERVER_ERROR)
      .json({ error: 'Could not fetch user' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneBy({ id: req.params.id });
    if (!user)
      return res.status(SC.NOT_FOUND).json({ error: 'User not found' });
    await User.delete({ id: user.id });
    return res.status(SC.OK).json({ info: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    return res
      .status(SC.INTERNAL_SERVER_ERROR)
      .json({ error: 'Could not fetch user' });
  }
};
