import { Category, Discipline, Test } from '@prisma/client';

export type TestBodyData = Omit<Test, 'id' | 'teacherDisciplineId'> & {
  disciplineId: number;
  teacherId: number;
};

export type TestInsertData = Omit<Test, 'id'>;

export type TestGroupedByDisciplineData = {
  term: number;
  disciplines: Discipline &
    {
      categories: Category &
        {
          tests: Test & { teacher: string }[];
        }[];
    }[];
};

export type TestGroupedByTeacherData = {
  teacher: string;
  categories: Category &
    {
      tests: Test & { discipline: string }[];
    }[];
};
