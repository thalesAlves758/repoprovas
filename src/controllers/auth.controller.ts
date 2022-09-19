import { Request, Response } from 'express';
import { HttpStatus } from '../types/http.types';
import {
  SignInBodyData,
  SignInResponse,
  SignUpBodyData,
} from '../types/auth.types';
import * as authServices from '../services/auth.services';

export async function signUp(req: Request, res: Response) {
  const { email, password }: SignUpBodyData = req.body;

  await authServices.signUp({ email, password });

  res.sendStatus(HttpStatus.CREATED);
}

export async function signIn(req: Request, res: Response) {
  const { email, password }: SignInBodyData = req.body;

  const response: SignInResponse = await authServices.signIn({
    email,
    password,
  });

  res.send(response);
}
