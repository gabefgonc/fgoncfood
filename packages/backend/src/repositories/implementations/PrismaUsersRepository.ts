import { CreateUserDTO, UpdateUserDTO } from 'types';
import { SerializableUser } from '../../types/user';
import { IUsersRepository } from '../IUsersRepository';
import { prisma } from '../../db/prisma';
import { hash } from 'bcrypt';
import { User } from '@prisma/client';

export class PrismaUsersRepository implements IUsersRepository {
  async create(data: CreateUserDTO): Promise<SerializableUser> {
    const passwordHash = await hash(data.password, 10);
    const user = await prisma.user.create({
      data: { ...data, password: passwordHash },
    });
    const serializable = { ...user, password: undefined };
    return serializable;
  }
  async findByID(id: string): Promise<SerializableUser | null> {
    const result = await prisma.user.findFirst({ where: { id } });
    if (!result) {
      return null;
    }
    const serializable = { ...result, password: undefined };
    return serializable;
  }

  async findByEmailOrPhoneNumber(identity: {
    phoneNumber?: string | undefined;
    email?: string | undefined;
  }): Promise<User | null> {
    let user: User | null = null;
    let found = false;
    if (identity.phoneNumber) {
      user = await prisma.user.findFirst({
        where: { phoneNumber: identity.phoneNumber },
      });
      found = true;
    }
    if (identity.email && !found) {
      user = await prisma.user.findFirst({
        where: { email: identity.email },
      });
    }
    return user;
  }

  async deleteByID(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }
  async update(data: UpdateUserDTO): Promise<SerializableUser> {
    const result = await prisma.user.update({
      where: { id: data.id },
      data: { ...data, id: undefined },
    });
    const serializable = { ...result, password: undefined };
    return serializable;
  }
}
