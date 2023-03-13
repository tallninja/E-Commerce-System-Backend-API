import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'slug' })
  slug: string;

  @Column({ name: 'description', nullable: true })
  desc: string;

  @ManyToMany(() => Product, (product) => product.categories)
  @JoinTable()
  products: Product[];

  @CreateDateColumn({ name: 'created_at', update: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @VersionColumn({ name: 'version' })
  version: number;
}
