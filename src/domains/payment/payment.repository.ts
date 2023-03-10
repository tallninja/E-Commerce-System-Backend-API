import { Service } from 'typedi';
import { Payment, PaymentStatus } from './payment.entity';

export interface FindOptionsWhere {
  order?: {
    id: string;
  };
  provider?: string;
  status?: PaymentStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface FindOptionsRelations {
  order?: boolean;
}

@Service()
export class PaymentRepository {
  findAll: () => Promise<Payment[]> = async () => {
    return await Payment.find();
  };

  findBy: (
    _w: FindOptionsWhere,
    _r?: FindOptionsRelations
  ) => Promise<Payment[]> = async (
    where: FindOptionsWhere,
    relations?: FindOptionsRelations
  ) => {
    return await Payment.find({ where, relations });
  };

  findOneBy: (
    _w: FindOptionsWhere,
    _r?: FindOptionsRelations
  ) => Promise<Payment | null> = async (
    where: FindOptionsWhere,
    relations?: FindOptionsRelations
  ) => {
    return await Payment.findOne({ where, relations });
  };

  findById: (
    _id: string,
    _r?: FindOptionsRelations
  ) => Promise<Payment | null> = async (
    id: string,
    relations?: FindOptionsRelations
  ) => {
    return await Payment.findOne({ where: { id }, relations });
  };

  save: (_p: Payment) => Promise<Payment> = async (_payment: Payment) => {
    const payment = Payment.create(_payment);
    return await payment.save();
  };

  update: (_p: Payment) => Promise<Payment> = async (_payment: Payment) => {
    return await _payment.save();
  };

  delete: (_p: Payment) => Promise<Payment> = async (_payment: Payment) => {
    return await _payment.remove();
  };
}
