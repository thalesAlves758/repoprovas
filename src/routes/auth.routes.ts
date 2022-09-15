import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { validateSchema } from '../middlewares/validateSchema.middleware';
import signUpSchema from '../schemas/signUp.schema';

const authRouter: Router = Router();

authRouter.post(
  '/sign-up',
  validateSchema(signUpSchema),
  authController.signUp
);

export default authRouter;
