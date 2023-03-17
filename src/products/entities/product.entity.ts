import { OrderItem } from '../../order-items/entities/order-item.entity';
import { CartItem } from '../../cart-items/entities/cart-item.entity';
import { Category } from '../../categories/entities/category.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', unique: true, nullable: false })
  name: string;

  @Column({ name: 'slug', unique: true, nullable: false })
  slug: string;

  @Column({ name: 'description' })
  desc: string;

  @Column({ name: 'sku', unique: true, nullable: false })
  sku: string;

  @Column({ name: 'price', type: 'decimal', scale: 2, nullable: false })
  price: number;

  @Column({ name: 'quantity', type: 'int', nullable: false, default: 0 })
  qty: number;

  @ManyToMany(() => Category, (category) => category.products)
  categories: Category[];

  @OneToMany(() => CartItem, (item) => item.product)
  cartItems: CartItem[];

  @OneToMany(() => OrderItem, (item) => item.order)
  orderItems: OrderItem[];

  @CreateDateColumn({ name: 'created_at', nullable: false, update: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @VersionColumn({ name: 'version' })
  version: number;
}
