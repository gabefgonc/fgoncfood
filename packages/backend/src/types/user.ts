import { User } from '@prisma/client';

export type SerializableUser = Omit<User, 'password'>;
