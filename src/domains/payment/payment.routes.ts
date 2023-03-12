import { Router } from 'express';
import { PaymentController } from './payment.controller';

const router = Router();

const paymentController = new PaymentController();

router.get('/', paymentController.getPayments);
router.post('/', paymentController.createPayment);
router.get('/:id', paymentController.getPayment);
router.put('/:id', paymentController.updatePayment);
router.delete('/:id', paymentController.deletePayment);

export { router as paymentRoutes };
