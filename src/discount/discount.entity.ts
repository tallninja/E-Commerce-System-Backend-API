import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Product } from '../product';

@Entity('product_discounts')
export class Discount extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ name: 'description', type: 'varchar' })
  desc: string;

  @Column({ type: 'int' })
  percent: number;

  @Column({ type: 'boolean', default: false })
  active: boolean;

  @OneToMany(() => Product, (product) => product.discount)
  products: Product[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
