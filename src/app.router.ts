import { Router } from 'express';
import { userRoutes } from './user';
import { productRoutes } from './products';

const router = Router();

router.use('/users', userRoutes);
router.use('/products', productRoutes);

export default router;
