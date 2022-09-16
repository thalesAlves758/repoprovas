import { Router } from 'express';
import authRouter from './auth.routes';
import testRouter from './test.routes';

const router: Router = Router();

router.use(authRouter);
router.use(testRouter);

export default router;
