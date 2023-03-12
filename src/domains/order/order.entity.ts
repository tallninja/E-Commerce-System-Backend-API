import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { User } from '../user';
import { OrderItem } from '../order-items';
import { Payment } from '../payment';

@Entity('orders')
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.orders, { onDelete: 'SET NULL' })
  user: User;

  @Column({ type: 'decimal' })
  total: number;

  @OneToOne(() => Payment, (payment) => payment.order)
  payment: Payment;

  @OneToMany(() => OrderItem, (oi) => oi.order)
  items: OrderItem[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
