import { Router } from 'express';
import { Container } from 'typedi';
import { PaymentController } from './payment.controller';

const router = Router();

const paymentController = Container.get(PaymentController);

router.get('/', paymentController.getAllPayments);
router.post('/', paymentController.createPayment);
router.get('/:id', paymentController.getPayment);
router.put('/:id', paymentController.updatePayment);
router.delete('/:id', paymentController.deletePayment);

export { router as paymentRoutes };
