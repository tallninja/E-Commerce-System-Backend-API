import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
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

  @CreateDateColumn({ name: 'created_at', nullable: false, update: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @VersionColumn({ name: 'version' })
  version: number;
}
