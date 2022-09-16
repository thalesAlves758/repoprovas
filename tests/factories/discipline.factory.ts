import { faker } from '@faker-js/faker';

export function generateDiscipline() {
  return {
    name: faker.random.word(),
  };
}
