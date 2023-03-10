import { DataSource } from 'typeorm';
import { Address } from '../address';
import { CartItem } from '../cart-items';
import { Cart } from '../carts';
import { Category } from '../category';
import { Discount } from '../discount';
import { Inventory } from '../inventory';
import { Order } from '../order';
import { OrderItem } from '../order_items';
import { Payment } from '../payment';
import { Product } from '../product';
import { ShoppingSession } from '../shopping-session';
import { User } from '../user';

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
