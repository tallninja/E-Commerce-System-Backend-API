import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { StatusCodes as SC } from 'http-status-codes';
import appRouter from './app.router';

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  return res.status(SC.OK).json({ info: 'E-Commerce Backend API' });
});

app.use('/api/v1', appRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server listening on:', `http://localhost:${PORT}`);
});
