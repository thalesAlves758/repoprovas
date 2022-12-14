import { prisma } from '../../src/config/database';
import {
  generateSignUpBody,
  generateSignInBody,
} from '../factories/auth.factory';
import app from '../../src/app';
import request from 'supertest';
import { insertRandomUser } from '../utils/user.utils';
import { faker } from '@faker-js/faker';

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY`;
});

describe('### POST /sign-in ###', () => {
  it('should return 200 status code and a token in the response', async () => {
    const { email, originalPassword: password } = await insertRandomUser();

    const response = await request(app)
      .post('/sign-in')
      .send({ email, password });

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should return 422 status code and a validation error message', async () => {
    const response = await request(app).post('/sign-in').send({});

    expect(response.status).toEqual(422);
    expect(response.text).toContain('Validation error:');
  });

  it('should return 401 status code and an error message when send a wrong email', async () => {
    const user = generateSignInBody();

    const response = await request(app).post('/sign-in').send(user);

    expect(response.status).toEqual(401);
    expect(response.text).toEqual('Invalid email or password');
  });

  it('should return 401 status code and an error message when send a wrong password', async () => {
    const { email } = await insertRandomUser();

    const response = await request(app)
      .post('/sign-in')
      .send({ email, password: faker.internet.password() });

    expect(response.status).toEqual(401);
    expect(response.text).toEqual('Invalid email or password');
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
