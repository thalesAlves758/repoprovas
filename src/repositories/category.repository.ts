import { Category } from '@prisma/client';
import { prisma } from '../config/database';

export async function findById(categoryId: number): Promise<Category | null> {
  return prisma.category.findUnique({ where: { id: categoryId } });
}
