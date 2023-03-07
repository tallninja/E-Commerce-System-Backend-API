import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../user';

@Entity('user_addresses')
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'address_line_1', type: 'varchar' })
  addr1: string;

  @Column({ name: 'address_line_2', type: 'varchar' })
  addr2: string;

  @Column('varchar')
  city: string;

  @Column({ name: 'postal_code', type: 'varchar' })
  postalCode: string;

  @Column()
  country: string;

  @Column()
  telephone: string;

  @Column()
  mobile: string;

  @ManyToOne(() => User, (user) => user.addresses)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
