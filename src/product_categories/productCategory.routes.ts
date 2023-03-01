import { Router } from 'express';
import {
  createProductCategory,
  deleteProductCategory,
  editProductCategory,
  getProductCategories,
  getProductCategory,
} from './productCategory.controller';

const router = Router();

router.get('/', getProductCategories);
router.post('/', createProductCategory);
router.get('/:id', getProductCategory);
router.patch('/:id', editProductCategory);
router.delete('/:id', deleteProductCategory);

export { router as productCategoryRoutes };
