import { Router } from 'express';
import { CartController } from './cart.controller';

const router: Router = Router();
const cartController: CartController = new CartController();

router.get('/', cartController.getAllCarts);
router.post('/', cartController.createCart);
router.get('/:id', cartController.getCart);
router.put('/:id', cartController.updateCart);
router.delete('/:id', cartController.deleteCart);

export { router as cartRoutes };
