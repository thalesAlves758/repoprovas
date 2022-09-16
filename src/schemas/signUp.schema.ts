import Joi from 'joi';
import { SignUpBodyData } from '../types/signUp.types';

const signUpSchema = Joi.object<SignUpBodyData>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.valid(Joi.ref('password')),
});

export default signUpSchema;
