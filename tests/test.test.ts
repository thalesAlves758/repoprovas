import { faker } from '@faker-js/faker';
import { Test } from '@prisma/client';
import request from 'supertest';
import app from '../src/app';
import { prisma } from '../src/config/database';
import { generateTestBody } from './factories/test.factory';
import { authenticateRandomUser } from './utils/auth.utils';
import { insertRandomCategory } from './utils/category.utils';
import { insertRandomDiscipline } from './utils/discipline.utils';
import { insertRandomTeacher } from './utils/teacher.util';
import { insertRandomTeacherDiscipline } from './utils/teacherDiscipline.utils';

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

describe('### POST /tests ###', () => {
  it('should return 422 status code and a validation error message', async () => {
    const response = await request(app).post('/tests').send({});

    expect(response.status).toEqual(422);
    expect(response.text).toContain('Validation error:');
  });

  it(`should return 401 status code and an error message when don't send jwt token`, async () => {
    const testBody = generateTestBody();

    const response = await request(app).post('/tests').send(testBody);

    expect(response.status).toEqual(401);
    expect(response.text).toEqual('A token is required');
  });

  it(`should return 401 status code and an error message when send an invalid jwt token`, async () => {
    const testBody = generateTestBody();

    const response = await request(app)
      .post('/tests')
      .set({ Authorization: `Bearer ${faker.random.word()}` })
      .send(testBody);

    expect(response.status).toEqual(401);
    expect(response.text).toEqual('Invalid token');
  });

  it(`should return 404 status code and an error message when send a category id that not exists`, async () => {
    const [token, { id: disciplineId }, { id: teacherId }] = await Promise.all([
      authenticateRandomUser(),
      insertRandomDiscipline(),
      insertRandomTeacher(),
    ]);

    const testBody = generateTestBody({
      disciplineId,
      teacherId,
    });

    const response = await request(app)
      .post('/tests')
      .set({ Authorization: `Bearer ${token}` })
      .send(testBody);

    expect(response.status).toEqual(404);
    expect(response.text).toEqual('Could not find specified category');
  });

  it(`should return 404 status code and an error message when send a discipline id that not exists`, async () => {
    const [token, { id: categoryId }, { id: teacherId }] = await Promise.all([
      authenticateRandomUser(),
      insertRandomCategory(),
      insertRandomTeacher(),
    ]);

    const testBody = generateTestBody({
      categoryId,
      teacherId,
    });

    const response = await request(app)
      .post('/tests')
      .set({ Authorization: `Bearer ${token}` })
      .send(testBody);

    expect(response.status).toEqual(404);
    expect(response.text).toEqual('Could not find specified discipline');
  });

  it(`should return 404 status code and an error message when send a teacher id that not exists`, async () => {
    const [token, { id: categoryId }, { id: disciplineId }] = await Promise.all(
      [
        authenticateRandomUser(),
        insertRandomCategory(),
        insertRandomDiscipline(),
      ]
    );

    const testBody = generateTestBody({
      categoryId,
      disciplineId,
    });

    const response = await request(app)
      .post('/tests')
      .set({ Authorization: `Bearer ${token}` })
      .send(testBody);

    expect(response.status).toEqual(404);
    expect(response.text).toEqual('Could not find specified teacher');
  });

  it(`should return 400 status code and an error message when send a teacher id that does not relate with specified discipline`, async () => {
    const [token, { id: categoryId }, { id: disciplineId }, { id: teacherId }] =
      await Promise.all([
        authenticateRandomUser(),
        insertRandomCategory(),
        insertRandomDiscipline(),
        insertRandomTeacher(),
      ]);

    const testBody = generateTestBody({
      categoryId,
      disciplineId,
      teacherId,
    });

    const response = await request(app)
      .post('/tests')
      .set({ Authorization: `Bearer ${token}` })
      .send(testBody);

    expect(response.status).toEqual(400);
    expect(response.text).toEqual(
      'This teacher does not teach specified discipline'
    );
  });

  it('should return 201 status code and the created test in the response body', async () => {
    const [token, { id: categoryId }, { disciplineId, teacherId }] =
      await Promise.all([
        authenticateRandomUser(),
        insertRandomCategory(),
        insertRandomTeacherDiscipline(),
      ]);

    const testBody = generateTestBody({
      categoryId,
      disciplineId,
      teacherId,
    });

    const response = await request(app)
      .post('/tests')
      .set({ Authorization: `Bearer ${token}` })
      .send(testBody);

    expect(response.status).toEqual(201);
    expect(response.body).toMatchObject({
      id: 1,
      categoryId: testBody.categoryId,
      name: testBody.name,
      pdfUrl: testBody.pdfUrl,
      teacherDisciplineId: 1,
    });
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
