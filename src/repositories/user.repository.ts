import { User } from '@prisma/client';
import { prisma } from '../config/database';
import { SignUpInsertData } from '../types/auth.types';

export async function findByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { email } });
}

export async function create(data: SignUpInsertData): Promise<void> {
  await prisma.user.create({ data });
}

export async function findById(userId: number): Promise<User | null> {
  return prisma.user.findUnique({ where: { id: userId } });
}
