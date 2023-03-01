import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ProductCategory } from '../product_categories';

@Entity('products')
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column({ type: 'text', nullable: true })
  desc: string;

  @Column({ type: 'varchar', unique: true })
  sku: string;

  @ManyToOne(() => ProductCategory, (pc) => pc.products, {
    onDelete: 'SET NULL',
  })
  category: string;

  @Column('varchar')
  inventory: string;

  @Column({ type: 'float', scale: 2 })
  price: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
