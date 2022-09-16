import { Request, Response } from 'express';
import { HttpStatus } from '../types/http.types';
import { SignUpBodyData } from '../types/auth.types';
import * as authServices from '../services/auth.services';

export async function signUp(req: Request, res: Response) {
  const { email, password }: SignUpBodyData = req.body;

  await authServices.signUp({ email, password });

  res.sendStatus(HttpStatus.CREATED);
}
