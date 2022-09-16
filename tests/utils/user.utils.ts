import { prisma } from '../../src/config/database';
import { generateSignInBody } from '../factories/auth.factory';
import bcrypt from 'bcrypt';

export async function insertRandomUser() {
  const user = generateSignInBody();

  const salt = 10;

  await prisma.user.create({
    data: {
      email: user.email,
      password: bcrypt.hashSync(user.password, salt),
    },
  });

  return user;
}
