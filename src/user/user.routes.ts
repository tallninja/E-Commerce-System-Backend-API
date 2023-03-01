import { Request, Response, Router } from 'express';
import { StatusCodes as SC } from 'http-status-codes';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  return res.status(SC.OK).json([]);
});

export { router as userRoutes };
