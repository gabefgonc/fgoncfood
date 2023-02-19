import { PrismaUsersRepository } from '../../../repositories/implementations/PrismaUsersRepository';
import { FindOneUserUseCase } from './FindOneUserUseCase';
import { FindOneUserController } from './FindOneUserController';

const repository = new PrismaUsersRepository();
const useCase = new FindOneUserUseCase(repository);
export const findOneUserController = new FindOneUserController(useCase);
