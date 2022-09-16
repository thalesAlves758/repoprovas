import { faker } from '@faker-js/faker';

export function generateCategory() {
  return {
    name: faker.random.word(),
  };
}
