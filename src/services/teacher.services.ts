import { Teacher } from '@prisma/client';
import { HttpError } from '../exceptions/http.exception';
import { findById } from '../repositories/teacher.repository';
import { HttpErrorType } from '../types/http.types';

export async function getTeacherById(teacherId: number): Promise<Teacher> {
  const teacher = await findById(teacherId);

  if (!teacher) {
    throw HttpError(
      HttpErrorType.NOT_FOUND,
      'Could not find specified teacher'
    );
  }

  return teacher;
}
