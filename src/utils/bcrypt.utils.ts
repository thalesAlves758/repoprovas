import bcrypt from 'bcrypt';

export function encryptPassword(password: string): string {
  const salt = 10;

  return bcrypt.hashSync(password, salt);
}

export function comparePassword(
  encryptedPassword: string,
  password: string
): boolean {
  return bcrypt.compareSync(password, encryptedPassword);
}
