import { Test } from '@prisma/client';

export type TestBodyData = Omit<Test, 'id' | 'teacherDisciplineId'> & {
  disciplineId: number;
  teacherId: number;
};

export type TestInsertData = Omit<Test, 'id'>;
