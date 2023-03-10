import { Service } from 'typedi';

import {
  FindOptionsRelations,
  FindOptionsWhere,
  PaymentRepository,
} from './payment.repository';
import { Order, OrderService } from '../order';
import { Payment, PaymentStatus } from './payment.entity';
import { BadRequestException, NotFoundException } from '../exceptions';

@Service()
export class PaymentService {
  constructor(
    private paymentRepository: PaymentRepository,
    private orderService: OrderService
  ) {}

  findAll = async () => {
    return await this.paymentRepository.findAll();
  };

  findById = async (id: string) => {
    const payment = await this.paymentRepository.findById(id);
    if (!payment) throw new NotFoundException('Payment Not Found');
    return payment;
  };

  findOneByOrder = async (orderId: string) => {
    // check if order exists
    const order: Order = await this.orderService.findOne({ id: orderId });
    if (!order) throw new NotFoundException('Order Not Found');
    const payment: Payment | null = await this.paymentRepository.findOneBy(
      { order: { id: orderId } },
      { order: true }
    );
    if (!payment) throw new NotFoundException('Payment Not Found');
    return payment;
  };

  createPayment = async (payment: Payment) => {
    const order: Order = await this.orderService.findOne({
      id: payment.order.id,
    });
    if (!order) throw new NotFoundException('Order Not Found');
    if (payment.amount < order.total)
      throw new BadRequestException('Amount paid is insufficient');
    if (payment.amount > order.total)
      throw new BadRequestException('Amount paid is in excess');
    payment.order = order;
    payment.status = PaymentStatus.PAID;
    return await this.paymentRepository.save(payment);
  };

  updatePayment = async (id: string, paymentData: Payment) => {
    const payment = await this.findById(id);
    Object.assign(payment, paymentData);
    return await this.paymentRepository.update(payment);
  };

  deletePayment = async (id: string) => {
    const payment = await this.findById(id);
    return this.paymentRepository.delete(payment);
  };
}
