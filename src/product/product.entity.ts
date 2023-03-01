import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
import { ProductCategory } from '../product_category';
import { ProductInventory } from '../product_inventory';
import { Discount } from '../discount';

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
  category: ProductCategory[];

  @ManyToOne(() => ProductInventory, (pi) => pi.products, {
    onDelete: 'SET NULL',
  })
  inventory: ProductInventory;

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

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

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
