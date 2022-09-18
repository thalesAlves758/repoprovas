import { Router } from 'express';
import { validateSchema } from '../middlewares/validateSchema.middleware';
import testSchema from '../schemas/test.schema';
import * as testController from '../controllers/test.controller';
import validateToken from '../middlewares/validateToken.middleware';

const testRouter = Router();

testRouter.post(
  '/tests',
  validateSchema(testSchema),
  validateToken,
  testController.create
);
testRouter.get(
  '/tests/by/discipline',
  validateToken,
  testController.getGroupedByDiscipline
);

export default testRouter;
