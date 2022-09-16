import { User } from '@prisma/client';
import { HttpError } from '../exceptions/http.exception';
import { create, findByEmail } from '../repositories/user.repository';
import { HttpErrorType } from '../types/http.types';
import { SignUpInsertData } from '../types/auth.types';
import { encryptPassword } from '../utils/bcrypt.utils';

export async function getUserByEmail(email: string): Promise<User | null> {
  return findByEmail(email);
}

async function validateNewUser(email: string): Promise<void> {
  const user: User | null = await getUserByEmail(email);

  if (user) {
    throw HttpError(HttpErrorType.CONFLICT, 'Email already in use');
  }
}

export async function signUp({
  email,
  password,
}: SignUpInsertData): Promise<void> {
  await validateNewUser(email);

  await create({ email, password: encryptPassword(password) });
}
