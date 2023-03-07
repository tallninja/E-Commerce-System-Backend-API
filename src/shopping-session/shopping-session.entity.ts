import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { User } from '../user';

@Entity('users_shopping_sessions')
export class ShoppingSession extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.shoppingSessions)
  user: User;

  @Column({ type: 'decimal', scale: 2 })
  total: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @VersionColumn()
  version: number;
}
