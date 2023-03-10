import express, { Application, Request, Response } from 'express';
import { StatusCodes as SC } from 'http-status-codes';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import appRoutes from '../app.routes';
import { errorHandler } from '../middlewares';

export const expressLoaders = ({ app }: { app: Application }) => {
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
  app.use('/api/v1', appRoutes);

  // error handling middleware
  app.use(errorHandler);

  // root route of the API
  app.get('/', (req: Request, res: Response) => {
    return res.status(SC.OK).json({ info: 'E-Commerce Backend API' });
  });
};
