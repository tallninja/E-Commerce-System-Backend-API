import { Router } from 'express';
import {
  createUser,
  deleteUser,
  editUser,
  getUser,
  getUsers,
} from './user.controllers';

const router = Router();

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:id', getUser);
router.patch('/:id', editUser);
router.delete('/:id', deleteUser);

export { router as userRoutes };
