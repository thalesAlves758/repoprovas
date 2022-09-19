import { prisma } from '../../src/config/database';
import { generateTeacher } from '../factories/teacher.factory';

export async function insertRandomTeacher() {
  return prisma.teacher.create({
    data: generateTeacher(),
  });
}
