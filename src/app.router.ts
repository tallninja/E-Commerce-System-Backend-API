import { Router } from 'express';
import { userRoutes } from './user';
import { productRoutes } from './products';
import { productCategoryRoutes } from './product_categories';

const router = Router();

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/product-categories', productCategoryRoutes);

export default router;
