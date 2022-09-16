import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function generateToken(payload: any): string {
  return jwt.sign(payload, process.env.JWT_SECRET ?? '', {
    expiresIn: '1d',
  });
}
