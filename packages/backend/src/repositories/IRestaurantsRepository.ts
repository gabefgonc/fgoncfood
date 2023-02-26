import { Restaurant } from '@prisma/client';
import { CreateRestaurantDTO } from 'types';

export interface IRestaurantsRepository {
  create(data: CreateRestaurantDTO): Promise<Restaurant>;
  search(name: string): Promise<Restaurant[]>;
  findById(id: string): Promise<Restaurant | null>;
  findByEmailAndPhoneNumber(
    email: string,
    phoneNumber: string
  ): Promise<Restaurant | null>;
}
