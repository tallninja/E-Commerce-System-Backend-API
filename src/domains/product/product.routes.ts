import { Router } from 'express';
import { ProductController } from './product.controller';

const router = Router();
const productController = new ProductController();

router.get('/', productController.getProducts);
router.post('/', productController.createProduct);
router.get('/:id', productController.getProduct);
router.patch('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export { router as productRoutes };
