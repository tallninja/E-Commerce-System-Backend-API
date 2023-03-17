import { Order } from '../../orders/entities/order.entity';
import { Role } from '../../roles/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name', length: 20 })
  firstName: string;

  @Column({ name: 'last_name', length: 20 })
  lastName: string;

  @Column({ name: 'email', length: 50, unique: true })
  email: string;

  @Column({ name: 'phone_number', length: 13 })
  phone: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'avatar', default: 'https://bit.ly/3Wgeq06' })
  avatar: string;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles: Role[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @CreateDateColumn({ name: 'created_at', update: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @VersionColumn({ name: 'version' })
  version: number;
}
