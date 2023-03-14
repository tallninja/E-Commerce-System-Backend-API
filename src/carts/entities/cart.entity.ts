import { DecimalTransformer } from 'src/utils';
import { CartItem } from '../../cart-items/entities/cart-item.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'total',
    type: 'numeric',
    precision: 4,
    scale: 2,
    default: 0,
    transformer: new DecimalTransformer(),
  })
  total: number;

  @OneToMany(() => CartItem, (item) => item.cart)
  @JoinColumn()
  items: CartItem[];

  @OneToOne(() => User)
  user: User;

  @CreateDateColumn({ name: 'created_at', update: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @VersionColumn({ name: 'version' })
  version: number;
}
