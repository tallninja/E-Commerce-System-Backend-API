import { Container } from 'typedi';
import { Router } from 'express';
import { InventoryController } from './inventory.controller';

const router = Router();
const inventoryController = Container.get(InventoryController);

router.get('/', inventoryController.getInventories);
router.post('/', inventoryController.createInventory);
router.get('/products/:id', inventoryController.getProducts);
router.get('/:id', inventoryController.getInventory);
router.patch('/:id', inventoryController.editInventory);
router.delete('/:id', inventoryController.deleteInventory);

export { router as inventoryRoutes };
