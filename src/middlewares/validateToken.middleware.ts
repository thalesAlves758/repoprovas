import { User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../exceptions/http.exception';
import { HttpErrorType } from '../types/http.types';
import { JwtUserPayload } from '../types/auth.types';
import { validateToken as validate } from '../utils/jwt.utils';
import { findUserById } from '../services/user.services';

function checkToken(token: string | undefined): JwtUserPayload {
  if (!token) {
    throw HttpError(HttpErrorType.UNAUTHORIZED, `A token is required`);
  }

  const decodedPayload = validate<JwtUserPayload>(token);

  if (!decodedPayload) {
    throw HttpError(HttpErrorType.UNAUTHORIZED, `Invalid token`);
  }

  return decodedPayload;
}

async function validateToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  const token: string | undefined = authorization?.replace('Bearer ', '');

  const { userId } = checkToken(token);

  const user: Partial<User> = await findUserById(userId);

  delete user.password;

  res.locals = { user };

  next();
}

export default validateToken;
