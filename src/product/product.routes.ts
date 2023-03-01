import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  editProduct,
  getProduct,
  getProducts,
} from './product.controller';

const router = Router();

router.get('/', getProducts);
router.post('/', createProduct);
router.get('/:id', getProduct);
router.patch('/:id', editProduct);
router.delete('/:id', deleteProduct);

export { router as productRoutes };
