import { Router } from 'express';
import { AddressController } from './address.controller';

const router = Router();
const addressController = new AddressController();

router.get('/', addressController.getAddresses);
router.post('/', addressController.createAddress);
router.get('/:id', addressController.getAddress);
router.patch('/:id', addressController.updateAddress);
router.delete('/:id', addressController.deleteAddress);

export { router as addressRoutes };
