import { prisma } from '../../src/config/database';
import { generateSignInBody } from '../factories/auth.factory';
import bcrypt from 'bcrypt';

export async function insertRandomUser() {
  const user = generateSignInBody();

  const salt = 10;

  const createdUser = await prisma.user.create({
    data: {
      email: user.email,
      password: bcrypt.hashSync(user.password, salt),
    },
  });

  return { ...createdUser, originalPassword: user.password };
}
