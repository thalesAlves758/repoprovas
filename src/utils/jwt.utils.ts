import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function generateToken(payload: any): string {
  return jwt.sign(payload, process.env.JWT_SECRET ?? '', {
    expiresIn: '1d',
  });
}

export function validateToken<T>(token: string): T | null {
  try {
    return jwt.verify(token, process.env.JWT_SECRET ?? '') as T;
  } catch (error) {
    return null;
  }
}
