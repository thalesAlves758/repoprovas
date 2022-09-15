import { User } from '@prisma/client';

export type SignUpBodyData = Omit<User, 'id'> & { confirmPassword: string };

export type SignUpInsertData = Omit<User, 'id'>;
