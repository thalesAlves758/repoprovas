import { faker } from '@faker-js/faker';

export function generateSignUpBody() {
  const password = faker.internet.password();

  return {
    email: faker.internet.email(),
    password,
    confirmPassword: password,
  };
}
