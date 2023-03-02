import { Container } from 'typedi';
import { Router } from 'express';
import { DiscountController } from './discount.controller';

const router = Router();
const controller = Container.get(DiscountController);

router.get('/', controller.getDiscounts);
router.post('/', controller.createDiscount);
router.get('/:id', controller.getDiscount);
router.patch('/:id', controller.editDiscount);
router.delete('/:id', controller.deleteDiscount);

export { router as discountRoutes };
