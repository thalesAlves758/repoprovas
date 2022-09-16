import { faker } from '@faker-js/faker';

export function generateTerm() {
  return {
    number: Number(faker.random.numeric()),
  };
}
