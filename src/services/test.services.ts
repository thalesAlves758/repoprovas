import { TeacherDiscipline, Test } from '@prisma/client';
import { prisma } from '../config/database';
import { HttpError } from '../exceptions/http.exception';
import { insert } from '../repositories/test.repository';
import { HttpErrorType } from '../types/http.types';
import { TestBodyData, TestInsertData } from '../types/test.types';
import { getCategoryById } from './category.services';
import { getDisciplineById } from './discipline.services';
import { getTeacherById } from './teacher.services';

async function validateDisciplineTeacherRelation(
  disciplineId: number,
  teacherId: number
): Promise<TeacherDiscipline> {
  const teacherDiscipline = await prisma.teacherDiscipline.findFirst({
    where: {
      disciplineId,
      AND: {
        teacherId,
      },
    },
  });

  if (!teacherDiscipline) {
    throw HttpError(
      HttpErrorType.BAD_REQUEST,
      'This teacher does not teach specified discipline'
    );
  }

  return teacherDiscipline;
}

export async function createTest({
  categoryId,
  disciplineId,
  name,
  pdfUrl,
  teacherId,
}: TestBodyData): Promise<Test> {
  await Promise.all([
    getCategoryById(categoryId),
    getDisciplineById(disciplineId),
    getTeacherById(teacherId),
  ]);

  const { id: teacherDisciplineId } = await validateDisciplineTeacherRelation(
    disciplineId,
    teacherId
  );

  const insertData: TestInsertData = {
    name,
    pdfUrl,
    categoryId,
    teacherDisciplineId,
  };

  return insert(insertData);
}
