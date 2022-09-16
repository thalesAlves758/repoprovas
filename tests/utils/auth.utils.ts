import { insertRandomUser } from './user.utils';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export async function authenticateRandomUser() {
  const { id } = await insertRandomUser();

  return jwt.sign({ userId: id }, process.env.JWT_SECRET ?? '');
}
