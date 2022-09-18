import { Test } from '@prisma/client';
import { Request, Response } from 'express';
import {
  createTest,
  getTestsGroupedByDiscipline,
} from '../services/test.services';
import { HttpStatus } from '../types/http.types';
import { TestBodyData, TestGroupedByDisciplineData } from '../types/test.types';

export async function create(req: Request, res: Response) {
  const body: TestBodyData = req.body;

  const result: Test = await createTest(body);

  res.status(HttpStatus.CREATED).send(result);
}

export async function getGroupedByDiscipline(req: Request, res: Response) {
  const tests: TestGroupedByDisciplineData[] =
    await getTestsGroupedByDiscipline();

  res.status(HttpStatus.OK).send(tests);
}
