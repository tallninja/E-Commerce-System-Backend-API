import { Request, Response, NextFunction } from 'express';
import { StatusCodes as SC } from 'http-status-codes';
import { PaymentService } from './payment.service';
import { Payment } from './payment.entity';

export class PaymentController {
  private service: PaymentService = PaymentService.getInstance();

  async createPayment(req: Request, res: Response, next: NextFunction) {
    try {
      const payment: Payment = await this.service.create(req.body);
      return res.status(SC.CREATED).json(payment);
    } catch (error) {
      return next(error);
    }
  }

  async getPayments(req: Request, res: Response, next: NextFunction) {
    try {
      const payments: Payment[] = await this.service.findAll();
      return res.status(SC.OK).json(payments);
    } catch (error) {
      return next(error);
    }
  }

  async getPayment(req: Request, res: Response, next: NextFunction) {
    try {
      const payment: Payment = await this.service.findOne(req.params.id);
      return res.status(SC.OK).json(payment);
    } catch (error) {
      return next(error);
    }
  }

  async updatePayment(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedPayment: Payment = await this.service.update(
        req.params.id,
        req.body
      );
      return res.status(SC.OK).json(updatedPayment);
    } catch (error) {
      return next(error);
    }
  }

  async deletePayment(req: Request, res: Response, next: NextFunction) {
    try {
      const payment: Payment = await this.service.delete(req.params.id);
      return res.status(SC.OK).json(payment);
    } catch (error) {
      return next(error);
    }
  }
}
