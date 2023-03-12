import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Address } from './domains/address';
import { CartItem } from './domains/cart-items';
import { Cart } from './domains/carts';
import { Category } from './domains/category';
import { Discount } from './domains/discount';
import { Inventory } from './domains/inventory';
import { Order } from './domains/order';
import { OrderItem } from './domains/order_items';
import { Payment } from './domains/payment';
import { Product } from './domains/product';
import { ShoppingSession } from './domains/shopping-session';
import { User } from './domains/user';
import Container, { Token } from 'typedi';

export const PgDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'password',
  database: 'ecommdb',
  synchronize: true,
  entities: [
    User,
    Product,
    Category,
    Inventory,
    Discount,
    OrderItem,
    Order,
    Address,
    ShoppingSession,
    Payment,
    Cart,
    CartItem,
  ],
});

export const initDb = async () => {
  try {
    await PgDataSource.initialize();
    console.log('Connected to database');
    (async () => {
      const ivs = await Inventory.find();
      if (!ivs.length) {
        const inventory = Inventory.create();
        await inventory.save();
        console.log('Created Inventory');
      }
    })();
  } catch (error) {
    console.error(error);
  }
};

export class DbDataSource {
  public static instance: DataSource;

  public static getInstance(): DataSource {
    if (!DbDataSource.instance) {
      DbDataSource.instance = PgDataSource;
    }

    return DbDataSource.instance;
  }
}
