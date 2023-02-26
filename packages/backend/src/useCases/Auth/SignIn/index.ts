import { PrismaUsersRepository } from '../../../repositories/implementations/PrismaUsersRepository';
import { SignInController } from './SignInController';
import { SignInUseCase } from './SignInUseCase';

const repository = new PrismaUsersRepository();
const useCase = new SignInUseCase(repository);
export const signInController = new SignInController(useCase);
