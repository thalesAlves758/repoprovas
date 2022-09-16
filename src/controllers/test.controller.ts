import { Test } from '@prisma/client';
import { Request, Response } from 'express';
import { createTest } from '../services/test.services';
import { HttpStatus } from '../types/http.types';
import { TestBodyData } from '../types/test.types';

export async function create(req: Request, res: Response) {
  const body: TestBodyData = req.body;

  const result: Test = await createTest(body);

  res.status(HttpStatus.CREATED).send(result);
}
