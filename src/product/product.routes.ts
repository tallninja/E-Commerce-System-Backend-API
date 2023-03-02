import { Container } from 'typedi';
import { Router } from 'express';
import { ProductController } from './product.controller';

const router = Router();
const productController = Container.get(ProductController);

router.get('/', productController.getProducts);
router.post('/', productController.createProduct);
router.get('/:id', productController.getProduct);
router.patch('/:id', productController.editProduct);
router.delete('/:id', productController.deleteProduct);

export { router as productRoutes };
