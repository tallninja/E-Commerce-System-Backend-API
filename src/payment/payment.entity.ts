import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
  JoinColumn,
} from 'typeorm';
import { Order } from '../order';

export enum PaymentStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  PAID = 'PAID',
}

@Entity('payment_details')
export class Payment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Order, (order) => order.payment)
  @JoinColumn()
  order: Order;

  @Column({ name: 'amount' })
  amount: number;

  @Column({ name: 'payment_provider' })
  provider: string;

  @Column({ name: 'status', type: 'enum', default: PaymentStatus.PENDING })
  status: PaymentStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @VersionColumn()
  version: number;
}
