import { prisma } from '../../src/config/database';
import { generateSignUpBody } from '../factories/auth.factory';
import app from '../../src/app';
import request from 'supertest';
import dotenv from 'dotenv';

dotenv.config();

describe('### POST /sign-up ###', () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY`;
  });

  it('should return 200 status code', async () => {
    const signUpBody = generateSignUpBody();

    const response = await request(app).post('/sign-up').send(signUpBody);

    expect(response.status).toEqual(201);
  });

  it('should return 409 status code', async () => {
    const signUpBody = generateSignUpBody();

    await request(app).post('/sign-up').send(signUpBody);
    const response = await request(app).post('/sign-up').send(signUpBody);

    expect(response.status).toEqual(409);
    expect(response.text).toEqual('Email already in use');
  });

  it('should return 422 status code', async () => {
    const signUpBody = {};

    const response = await request(app).post('/sign-up').send(signUpBody);

    expect(response.status).toEqual(422);
    expect(response.text).toContain('Validation error:');
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
});
