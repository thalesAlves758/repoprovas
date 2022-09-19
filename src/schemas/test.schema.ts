import Joi from 'joi';
import { TestBodyData } from '../types/test.types';

const GREATER_THAN = 0;

const testSchema = Joi.object<TestBodyData>({
  name: Joi.string().required(),
  pdfUrl: Joi.string().uri(),
  categoryId: Joi.number().greater(GREATER_THAN).required(),
  disciplineId: Joi.number().greater(GREATER_THAN).required(),
  teacherId: Joi.number().greater(GREATER_THAN).required(),
});

export default testSchema;
