import { User } from '@prisma/client';
import { HttpError } from '../exceptions/http.exception';
import { findById } from '../repositories/user.repository';
import { HttpErrorType } from '../types/http.types';

export async function findUserById(userId: number): Promise<User> {
  const user = await findById(userId);

  if (!user) {
    throw HttpError(HttpErrorType.NOT_FOUND, `User not found`);
  }

  return user;
}
