import { Router } from 'express';
import {
  createProductCategory,
  deleteProductCategory,
  editProductCategory,
  getProductCategories,
  getProductCategory,
  getProducts,
} from './productCategory.controller';

const router = Router();

router.get('/', getProductCategories);
router.post('/', createProductCategory);
router.get('/:id', getProductCategory);
router.get('/products/:id', getProducts);
router.patch('/:id', editProductCategory);
router.delete('/:id', deleteProductCategory);

export { router as productCategoryRoutes };
