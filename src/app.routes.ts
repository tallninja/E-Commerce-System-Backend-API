import { Router } from 'express';
import { userRoutes } from './user';
import { productRoutes } from './product';
import { productCategoryRoutes } from './product_category';
import { productInventoryRoutes } from './product_inventory';

const router = Router();

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/product-categories', productCategoryRoutes);
router.use('/product-inventories', productInventoryRoutes);

export default router;
