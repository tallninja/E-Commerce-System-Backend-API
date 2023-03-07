import { Router } from 'express';
import { Container } from 'typedi';
import { ShoppingSessionController } from './shopping-session.controller';

const router = Router();

const controller = Container.get(ShoppingSessionController);

router.get('/', controller.getSessions);
router.post('/', controller.createSession);
router.get('/:id', controller.getSession);
router.put('/:id', controller.updateSession);
router.delete('/:id', controller.deleteSession);

export { router as shoppingSessionRoutes };
