import { PrismaUsersRepository } from '../../../repositories/implementations/PrismaUsersRepository';
import { CreateUserController } from './CreateUserController';
import { CreateUserUseCase } from './CreateUserUseCase';

const repository = new PrismaUsersRepository();
const useCase = new CreateUserUseCase(repository);
export const createUserController = new CreateUserController(useCase);
