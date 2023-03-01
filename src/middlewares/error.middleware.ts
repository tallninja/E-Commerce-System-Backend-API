import { NextFunction, Request, Response } from 'express';
import { StatusCodes as SC } from 'http-status-codes';
import { CustomError } from '../exceptions';

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!err.status)
    return res.status(SC.INTERNAL_SERVER_ERROR).json({
      error: { status: SC.INTERNAL_SERVER_ERROR, message: err.message },
    });
  return res.status(err.status).json({
    error: { status: err.status, message: err.message },
    path: req.path,
  });
};
