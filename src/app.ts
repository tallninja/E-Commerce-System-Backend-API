import 'reflect-metadata';
import { DataSource } from 'typeorm';
import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { StatusCodes as SC } from 'http-status-codes';
import appRouter from './app.routes';
import { errorHandler } from './middlewares';
import { User } from './user';
import { Product } from './product';
import { ProductCategory } from './product_category';
import { ProductInventory } from './product_inventory';
import { Discount } from './discount';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'password',
  database: 'ecommdb',
  synchronize: true,
  entities: [User, Product, ProductCategory, ProductInventory, Discount],
});

(async () => {
  try {
    await AppDataSource.initialize();
    console.log('Connected to database');
  } catch (error) {
    console.error(error);
  }
})();

// initialize express app
const app = express();

// Setup CORS
app.use(cors());

// secure API by setting various HTTP headers
app.use(helmet());

// Compression middleware. Copresses response bodies
app.use(compression());

// parses json in the request
app.use(express.json());

// parses urlencoded bodies
app.use(express.urlencoded({ extended: true }));

// app router
app.use('/api/v1', appRouter);

// error handling middleware
app.use(errorHandler);

// root route of the API
app.get('/', (req: Request, res: Response) => {
  return res.status(SC.OK).json({ info: 'E-Commerce Backend API' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server listening on:', `http://localhost:${PORT}`);
});
