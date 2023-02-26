import { Restaurant } from '@prisma/client';
import { CreateRestaurantDTO } from 'types';
import { createRestaurantDTO } from 'types/lib/dto/CreateRestaurantDTO';
import { IRestaurantsRepository } from '../../../repositories/IRestaurantsRepository';
import { ZodError } from 'zod';
import {
  BadInputError,
  InternalError,
  RecordAlreadyExistsError,
} from '../../../utils/errors';

export class CreateRestaurantUseCase {
  constructor(private restaurantsRepository: IRestaurantsRepository) {}

  async execute(data: CreateRestaurantDTO): Promise<Restaurant> {
    let parsed: CreateRestaurantDTO;
    try {
      parsed = createRestaurantDTO.parse(data);
    } catch (e) {
      if (e instanceof ZodError) {
        throw new BadInputError(e.issues[0].message);
      }
      console.log(e);
      throw new InternalError('Internal Server Error');
    }
    const restaurantAlreadyExists =
      await this.restaurantsRepository.findByEmailAndPhoneNumber(
        parsed.email,
        parsed.phoneNumber
      );
    if (restaurantAlreadyExists) {
      throw new RecordAlreadyExistsError(
        'A restaurant with that email or phone number already exists'
      );
    }

    const restaurant = await this.restaurantsRepository.create(parsed);

    return restaurant;
  }
}
