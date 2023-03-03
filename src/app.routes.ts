import { Router } from 'express';
import { userRoutes } from './user';
import { productRoutes } from './product';
import { categoryRoutes } from './category';
import { inventoryRoutes } from './inventory';
import { discountRoutes } from './discount';
import { orderItemsRoutes } from './order_items';
import { orderRoutes } from './order';

const router = Router();

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/inventories', inventoryRoutes);
router.use('/discounts', discountRoutes);
router.use('/order-items', orderItemsRoutes);
router.use('/orders', orderRoutes);

export default router;
