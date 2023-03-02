import { Router } from 'express';
import { ProductInventoryController } from './productInventory.controller';

const router = Router();
const inventoryController = new ProductInventoryController();

router.get('/', inventoryController.getInventories);
router.post('/', inventoryController.createInventory);
router.get('/products/:id', inventoryController.getProducts);
router.get('/:id', inventoryController.getInventory);
router.patch('/:id', inventoryController.editInventory);
router.delete('/:id', inventoryController.deleteInventory);

export { router as productInventoryRoutes };
