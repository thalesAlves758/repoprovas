import { prisma } from '../../src/config/database';
import { generateCategory } from '../factories/category.factory';
import { generateDiscipline } from '../factories/discipline.factory';
import { generateTeacher } from '../factories/teacher.factory';
import { generateTerm } from '../factories/term.factory';
import { generateTest } from '../factories/test.factory';

export async function insertRandomTest() {
  return prisma.test.create({
    data: {
      ...generateTest(),
      Category: {
        create: generateCategory(),
      },
      TeacherDiscipline: {
        create: {
          Discipline: {
            create: {
              ...generateDiscipline(),
              Term: {
                create: generateTerm(),
              },
            },
          },
          Teacher: {
            create: generateTeacher(),
          },
        },
      },
    },
  });
}
