import { prisma } from '../../src/config/database';
import { generateDiscipline } from '../factories/discipline.factory';
import { generateTerm } from '../factories/term.factory';

export async function insertRandomDiscipline() {
  return prisma.discipline.create({
    data: {
      ...generateDiscipline(),
      Term: {
        create: generateTerm(),
      },
    },
  });
}
