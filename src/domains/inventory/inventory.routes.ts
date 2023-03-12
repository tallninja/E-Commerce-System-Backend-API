import { Router } from 'express';
import { InventoryController } from './inventory.controller';

const router = Router();
const inventoryController = new InventoryController();

router.get('/', inventoryController.getInventories);
router.post('/', inventoryController.createInventory);
router.get('/:id', inventoryController.getInventory);
router.patch('/:id', inventoryController.updateInventory);
router.delete('/:id', inventoryController.deleteInventory);

export { router as inventoryRoutes };
