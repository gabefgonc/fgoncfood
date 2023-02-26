import { Restaurant } from '@prisma/client';
import { CreateRestaurantDTO } from 'types';
import { IRestaurantsRepository } from '../IRestaurantsRepository';
import { prisma } from '../../db/prisma';

export class PrismaRestaurantsRepository implements IRestaurantsRepository {
  async create(data: CreateRestaurantDTO): Promise<Restaurant> {
    const restaurant = await prisma.restaurant.create({ data });

    return restaurant;
  }

  async search(name: string): Promise<Restaurant[]> {
    return await prisma.restaurant.findMany({
      where: { name: { contains: name } },
    });
  }

  async findById(id: string): Promise<Restaurant | null> {
    return await prisma.restaurant.findFirst({ where: { id } });
  }

  async findByEmailAndPhoneNumber(
    email: string,
    phoneNumber: string
  ): Promise<Restaurant | null> {
    const both = await prisma.restaurant.findFirst({
      where: { email, phoneNumber },
    });

    if (both) {
      return both;
    }

    const existsWithEmail = await prisma.restaurant.findFirst({
      where: { email },
    });

    if (existsWithEmail) {
      return existsWithEmail;
    }

    const existsWithPhoneNumber = await prisma.restaurant.findFirst({
      where: { phoneNumber },
    });

    if (existsWithPhoneNumber) {
      return existsWithPhoneNumber;
    }

    return null;
  }
}
