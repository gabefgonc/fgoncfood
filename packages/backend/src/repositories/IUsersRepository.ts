import { User } from '@prisma/client';
import type { CreateUserDTO, UpdateUserDTO } from 'types';
import { SerializableUser } from '../types/user';

export interface IUsersRepository {
  create(data: CreateUserDTO): Promise<SerializableUser>;
  findByID(id: string): Promise<SerializableUser | null>;
  findByEmailOrPhoneNumber(identity: {
    phoneNumber?: string;
    email?: string;
  }): Promise<User | null>;
  deleteByID(id: string): Promise<void>;
  update(data: UpdateUserDTO): Promise<SerializableUser>;
}
