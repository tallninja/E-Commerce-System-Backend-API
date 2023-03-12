import { Router } from 'express';
import { CartItemController } from './cart-item.controller';

const router = Router();
const controller = new CartItemController();

router.get('/', controller.getCartItems);
router.post('/', controller.createCartItem);
router.get('/:id', controller.getCartItem);
router.put('/:id', controller.updateCartItem);
router.delete('/:id', controller.deleteCartItem);

export { router as cartItemRoutes };
