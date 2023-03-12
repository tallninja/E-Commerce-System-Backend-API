import { NotFoundException } from '../../exceptions';
import { Payment } from './payment.entity';
import { PaymentRepository } from './payment.repository';

export class PaymentService {
  public static instance: PaymentService;

  private readonly repository: PaymentRepository =
    PaymentRepository.getInstance();

  async findAll(): Promise<Payment[]> {
    return this.repository.findAll();
  }

  async findOne(id: string): Promise<Payment> {
    const payment = await this.repository.findById(id);
    if (!payment) throw new NotFoundException('Payment Not Found');
    return payment;
  }

  async create(data: Partial<Payment>): Promise<Payment> {
    return this.repository.save(data);
  }

  async update(id: string, data: Partial<Payment>): Promise<Payment> {
    const payment = await this.findOne(id);
    Object.assign(payment, data);
    return this.repository.save(payment);
  }

  async delete(id: string): Promise<Payment> {
    const payment = await this.findOne(id);
    return this.repository.delete(payment);
  }

  public static getInstance(): PaymentService {
    if (!PaymentService.instance) {
      PaymentService.instance = new PaymentService();
    }

    return PaymentService.instance;
  }
}
