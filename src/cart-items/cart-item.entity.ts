import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { Product } from '../product';
import { Cart } from '../carts';

@Entity('cart_items')
export class CartItem extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Product)
  @JoinColumn()
  product: Product;

  @ManyToOne(() => Cart, (cart) => cart.items)
  cart: Cart;

  @Column({ name: 'quantity' })
  qty: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @VersionColumn({ name: 'version' })
  version: number;
}
