import { Router } from 'express';
import { userRoutes } from './user';
import { productRoutes } from './product';
import { productCategoryRoutes } from './product_category';
import { productInventoryRoutes } from './product_inventory';
import { discountRoutes } from './discount';
import { orderItemsRoutes } from './order_items';
import { orderRoutes } from './order';

const router = Router();

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/product-categories', productCategoryRoutes);
router.use('/product-inventories', productInventoryRoutes);
router.use('/discounts', discountRoutes);
router.use('/order-items', orderItemsRoutes);
router.use('/orders', orderRoutes);

export default router;
