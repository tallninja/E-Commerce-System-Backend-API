import { Router } from 'express';
import { OrderController } from './order.controller';

const router = Router();
const orderController = new OrderController();

router.get('/', orderController.getOrders);
router.post('/', orderController.createOrder);
router.get('/:id', orderController.getOrder);
router.patch('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

export { router as orderRoutes };
