import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../../shared/errors/AppError';
import { verify } from 'jsonwebtoken';

export const isAuth = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new AppError('Failed to verify token!', 500);
  }

  const token = authorization.split(' ')[1];

  try {
    verify(token, process.env.JWT_SECRET);
    return next();
  } catch {
    throw new AppError('Validation token invalid', 500);
  }
};
