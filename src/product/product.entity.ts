import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Category } from '../category';
import { Inventory } from '../inventory';
import { Discount } from '../discount';

@Entity('products')
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'varchar', unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  desc: string;

  @Column({ type: 'varchar', unique: true })
  sku: string;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'SET NULL',
  })
  category: Category[];

  @ManyToOne(() => Inventory, (inventory) => inventory.products, {
    onDelete: 'SET NULL',
  })
  inventory: Inventory;

  @ManyToOne(() => Discount, (discount) => discount.products, {
    onDelete: 'SET NULL',
  })
  discount: Discount;

  @Column({ type: 'float', scale: 2 })
  price: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  afterCreate = () => {
    if (this.inventory) {
      this.inventory.qty += 1;
      this.inventory.save();
    }
  };

  afterDelete = () => {
    if (this.inventory) {
      this.inventory.qty -= 1;
      this.inventory.save();
    }
  };
}
