import { DbDataSource } from '../../data-source';
import { DataSource, Repository } from 'typeorm';
import { Payment, PaymentStatus } from './payment.entity';

export interface FindOptionsWhere {
  id?: string;
  order?: {
    id: string;
  };
  status?: PaymentStatus;
  createdAt?: Date;
}

export interface FindOptionsRelations {
  order?: boolean;
}

export class PaymentRepository {
  public static instance: PaymentRepository;

  private readonly dataSource: DataSource = DbDataSource.getInstance();
  private readonly repository: Repository<Payment> =
    this.dataSource.getRepository(Payment);

  async findAll(): Promise<Payment[]> {
    return this.repository.find();
  }

  async findBy(
    where: FindOptionsWhere,
    relations?: FindOptionsRelations
  ): Promise<Payment[]> {
    return this.repository.find({ where, relations });
  }

  async findById(id: string): Promise<Payment | null> {
    return this.repository.findOneBy({ id });
  }

  async findOneBy(
    where: FindOptionsWhere,
    relations?: FindOptionsRelations
  ): Promise<Payment | null> {
    return this.repository.findOne({ where, relations });
  }

  async save(data: Partial<Payment>): Promise<Payment> {
    const payment: Payment = this.repository.create(data);
    return this.repository.save(payment);
  }

  async update(payment: Payment): Promise<Payment> {
    return this.repository.save(payment);
  }

  async delete(payment: Payment): Promise<Payment> {
    return this.repository.remove(payment);
  }

  public static getInstance(): PaymentRepository {
    if (!PaymentRepository.instance) {
      PaymentRepository.instance = new PaymentRepository();
    }

    return PaymentRepository.instance;
  }
}
