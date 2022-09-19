import { Discipline } from '@prisma/client';
import { prisma } from '../config/database';

export async function findById(
  disciplineId: number
): Promise<Discipline | null> {
  return prisma.discipline.findUnique({ where: { id: disciplineId } });
}
