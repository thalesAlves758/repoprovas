import { faker } from '@faker-js/faker';

export function generateTeacher() {
  return {
    name: faker.random.word(),
  };
}
