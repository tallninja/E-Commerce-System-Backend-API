import { Router } from 'express';
import { CategoryController } from './category.controller';

const router = Router();
const categoryController = new CategoryController();

router.get('/', categoryController.getCategories);
router.post('/', categoryController.createCategory);
router.get('/:id', categoryController.getCategory);
router.patch('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

export { router as categoryRoutes };
