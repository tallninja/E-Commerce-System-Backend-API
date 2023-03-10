import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { expressLoaders } from './loaders';
import { initDb } from './db';

// initialize express app
const app = express();

// connect and initialize database data
initDb();

// load express configuraions, routes and middlewares
expressLoaders({ app });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server listening on:', `http://localhost:${PORT}`);
});
