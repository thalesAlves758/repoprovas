import Joi from 'joi';
import { SignInBodyData } from '../types/auth.types';

const signInSchema = Joi.object<SignInBodyData>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export default signInSchema;
