import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'total', type: 'decimal', scale: 2, default: 0.0 })
  total: number;

  @CreateDateColumn({ name: 'created_at', update: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @VersionColumn({ name: 'version' })
  version: number;
}
