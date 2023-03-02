import { Container } from 'typedi';
import { Router } from 'express';
import { OrderItemController } from './orderItem.controller';

const router = Router();
const orderItemController = Container.get(OrderItemController);

router.get('/', orderItemController.getOrderItems);
router.post('/', orderItemController.createOrderItem);
router.get('/:id', orderItemController.getOrderItem);
router.patch('/:id', orderItemController.editOrderItem);
router.delete('/:id', orderItemController.deleteOrderItem);

export { router as orderItemsRoutes };
