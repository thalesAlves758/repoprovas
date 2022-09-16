import { User } from '@prisma/client';
import { HttpError } from '../exceptions/http.exception';
import { create, findByEmail } from '../repositories/user.repository';
import { HttpErrorType } from '../types/http.types';
import {
  SignInBodyData,
  SignInResponse,
  SignUpInsertData,
} from '../types/auth.types';
import { comparePassword, encryptPassword } from '../utils/bcrypt.utils';
import { generateToken } from '../utils/jwt.utils';

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

async function validateUser(email: string, password: string): Promise<User> {
  const user: User | null = await getUserByEmail(email);

  if (!user || !comparePassword(user.password, password)) {
    throw HttpError(HttpErrorType.UNAUTHORIZED, 'Invalid email or password');
  }

  return user;
}

export async function signIn({
  email,
  password,
}: SignInBodyData): Promise<SignInResponse> {
  const user = await validateUser(email, password);

  return {
    token: generateToken({ userId: user.id }),
  };
}
