import { Teacher } from '@prisma/client';
import { prisma } from '../config/database';

export async function findById(teacherId: number): Promise<Teacher | null> {
  return prisma.teacher.findUnique({ where: { id: teacherId } });
}
