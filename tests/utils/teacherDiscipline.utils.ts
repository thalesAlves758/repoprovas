import { prisma } from '../../src/config/database';
import { generateDiscipline } from '../factories/discipline.factory';
import { generateTeacher } from '../factories/teacher.factory';
import { generateTerm } from '../factories/term.factory';

export async function insertRandomTeacherDiscipline() {
  return prisma.teacherDiscipline.create({
    data: {
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
  });
}
