import { Router } from 'express';
import { Container } from 'typedi';
import { AddressController } from './address.controller';

const router = Router();
const addressController = Container.get(AddressController);

router.get('/', addressController.getAddresses);
router.post('/', addressController.createAddress);
router.get('/:id', addressController.getAddress);
router.patch('/:id', addressController.updateAddress);
router.delete('/:id', addressController.deleteAddress);

export { router as addressRoutes };
