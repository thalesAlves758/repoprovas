import { prisma } from '../../src/config/database';
import { generateCategory } from '../factories/category.factory';

export async function insertRandomCategory() {
  return prisma.category.create({ data: generateCategory() });
}
