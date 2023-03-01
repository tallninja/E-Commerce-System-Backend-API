import { NextFunction, Request, Response } from 'express';
import { StatusCodes as SC } from 'http-status-codes';
import { CustomError } from '../exceptions';
import { logger } from '../utils';

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!err.status) {
    logger.error(err.message, {
      status: SC.INTERNAL_SERVER_ERROR,
      path: req.path,
    });
    return res.status(SC.INTERNAL_SERVER_ERROR).json({
      error: { status: SC.INTERNAL_SERVER_ERROR, message: err.message },
    });
  }
  logger.error(err.message, {
    status: err.status,
    path: req.path,
  });
  return res.status(err.status).json({
    error: { status: err.status, message: err.message },
    path: req.path,
  });
};
