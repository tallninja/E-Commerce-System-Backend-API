import { Router } from 'express';
import { OrderItemController } from './order-item.controller';

const router = Router();
const orderItemController = new OrderItemController();

router.get('/', orderItemController.getOrderItems);
router.post('/', orderItemController.createOrderItem);
router.get('/:id', orderItemController.getOrderItem);
router.patch('/:id', orderItemController.updateOrderItem);
router.delete('/:id', orderItemController.deleteOrderItem);

export { router as orderItemsRoutes };
