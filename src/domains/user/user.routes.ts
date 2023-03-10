import { Container } from 'typedi';
import { Router } from 'express';
import { UserController } from './user.controllers';

const router = Router();
const userController = Container.get(UserController);

router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.get('/:id', userController.getUser);
router.patch('/:id', userController.editUser);
router.delete('/:id', userController.deleteUser);

export { router as userRoutes };
