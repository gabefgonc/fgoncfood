import { CreateUserDTO, UpdateUserDTO } from 'types';
import { SerializableUser } from '../../types/user';
import { IUsersRepository } from '../IUsersRepository';
import { prisma } from '../../db/prisma';

export class PrismaUsersRepository implements IUsersRepository {
  async create(data: CreateUserDTO): Promise<SerializableUser> {
    const user = await prisma.user.create({ data });
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
