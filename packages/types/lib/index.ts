import { CreateUserDTO, createUserDTO } from './dto/CreateUserDTO';
import { UpdateUserDTO } from './dto/UpdateUserDTO';

export type JwtPayload = { userId: string };

export type { CreateUserDTO, UpdateUserDTO };
export { createUserDTO };
