import { Category } from '@prisma/client';
import { HttpError } from '../exceptions/http.exception';
import { findById } from '../repositories/category.repository';
import { HttpErrorType } from '../types/http.types';

export async function getCategoryById(categoryId: number): Promise<Category> {
  const category = await findById(categoryId);

  if (!category) {
    throw HttpError(
      HttpErrorType.NOT_FOUND,
      'Could not find specified category'
    );
  }

  return category;
}
