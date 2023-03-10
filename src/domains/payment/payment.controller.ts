import { Service } from 'typedi';
import { PaymentService } from './payment.service';
import { NextFunction, Request, Response } from 'express';
import { Payment } from './payment.entity';

@Service()
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  getAllPayments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await this.paymentService.findAll();
    } catch (error) {
      return next(error);
    }
  };

  getPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await this.paymentService.findById(req.params.id);
    } catch (error) {
      return next(error);
    }
  };

  createPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await this.paymentService.createPayment(req.body as Payment);
    } catch (error) {
      return next(error);
    }
  };

  updatePayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await this.paymentService.updatePayment(req.params.id, req.body);
    } catch (error) {
      return next(error);
    }
  };

  deletePayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await this.paymentService.deletePayment(req.params.id);
    } catch (error) {
      return next(error);
    }
  };
}
