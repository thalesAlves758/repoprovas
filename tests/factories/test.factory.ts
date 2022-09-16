import { faker } from '@faker-js/faker';

export function generateTestBody({
  categoryId,
  disciplineId,
  teacherId,
}: {
  categoryId?: number;
  disciplineId?: number;
  teacherId?: number;
} = {}) {
  return {
    name: faker.random.words(3),
    pdfUrl: faker.internet.url(),
    categoryId: categoryId ?? Number(faker.random.numeric()),
    disciplineId: disciplineId ?? Number(faker.random.numeric()),
    teacherId: teacherId ?? Number(faker.random.numeric()),
  };
}
