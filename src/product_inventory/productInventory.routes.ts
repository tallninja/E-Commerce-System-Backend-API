import { Router } from 'express';
import {
  createInventory,
  deleteInventory,
  editInventory,
  getInventories,
  getInventory,
  getProducts,
} from './productInventory.controller';

const router = Router();

router.get('/', getInventories);
router.post('/', createInventory);
router.get('/:id', getInventory);
router.get('/products/:id', getProducts);
router.patch('/:id', editInventory);
router.delete('/:id', deleteInventory);

export { router as productInventoryRoutes };
