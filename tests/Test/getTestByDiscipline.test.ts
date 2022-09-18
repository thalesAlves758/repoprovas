import { faker } from '@faker-js/faker';
import request from 'supertest';
import app from '../../src/app';
import { prisma } from '../../src/config/database';
import { authenticateRandomUser } from '../utils/auth.utils';
import { insertRandomTest } from '../utils/test.utils';

beforeEach(async () => {
  await prisma.$executeRaw`
    TRUNCATE TABLE
      tests,
      categories,
      disciplines,
      terms,
      teachers,
      "teachersDisciplines"
    RESTART IDENTITY
  `;
});

describe('### GET /tests/by/discipline ###', () => {
  it(`should return 401 status code and an error message when don't send token`, async () => {
    const response = await request(app).get('/tests/by/discipline');

    expect(response.status).toEqual(401);
    expect(response.text).toEqual('A token is required');
  });

  it(`should return 401 status code and an error message when send an invalid token`, async () => {
    const response = await request(app)
      .get('/tests/by/discipline')
      .set({ Authorization: `Bearer ${faker.random.word()}` });

    expect(response.status).toEqual(401);
    expect(response.text).toEqual('Invalid token');
  });

  it(`should return 200 status code and an array with data or empty`, async () => {
    const [token] = await Promise.all([
      authenticateRandomUser(),
      insertRandomTest(),
    ]);

    const response = await request(app)
      .get('/tests/by/discipline')
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toEqual(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(1);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
