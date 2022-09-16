import { Test } from '@prisma/client';
import { prisma } from '../config/database';
import { TestInsertData } from '../types/test.types';

export async function insert(data: TestInsertData): Promise<Test> {
  return prisma.test.create({ data });
}
