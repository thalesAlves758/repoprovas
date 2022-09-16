import { Discipline } from '@prisma/client';
import { HttpError } from '../exceptions/http.exception';
import { findById } from '../repositories/discipline.repository';
import { HttpErrorType } from '../types/http.types';

export async function getDisciplineById(
  disciplineId: number
): Promise<Discipline> {
  const discipline = await findById(disciplineId);

  if (!discipline) {
    throw HttpError(
      HttpErrorType.NOT_FOUND,
      'Could not find specified discipline'
    );
  }

  return discipline;
}
