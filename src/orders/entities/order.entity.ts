import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { DecimalTransformer } from '../../utils';
import { OrderItem } from 'src/order-items/entities/order-item.entity';

@Entity('order_details')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @Column({
    name: 'total',
    type: 'numeric',
    precision: 4,
    scale: 2,
    default: 0,
    transformer: new DecimalTransformer(),
  })
  total: number;

  @OneToMany(() => OrderItem, (item) => item.order)
  orderItems: OrderItem[];

  @CreateDateColumn({ name: 'created_at', update: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @VersionColumn({ name: 'version' })
  version: number;
}
