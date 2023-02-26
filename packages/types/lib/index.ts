import { CreateUserDTO, createUserDTO } from './dto/CreateUserDTO';
import { UpdateUserDTO } from './dto/UpdateUserDTO';
import { CreateRestaurantDTO } from './dto/CreateRestaurantDTO';

export type JwtPayload = { userId: string };

export type { CreateUserDTO, UpdateUserDTO, CreateRestaurantDTO };
export { createUserDTO };
