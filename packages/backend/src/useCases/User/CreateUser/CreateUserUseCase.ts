import { createUserDTO, CreateUserDTO } from 'types';
import { ZodError } from 'zod';
import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { BadInputError, InternalError } from '../../../utils/errors';

export class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: CreateUserDTO) {
    let parsed: CreateUserDTO;
    try {
      parsed = createUserDTO.parse(data);
    } catch (e) {
      if (e instanceof ZodError) {
        console.log(e.issues);
        throw new BadInputError(e.issues[0].message);
      }
      throw new InternalError('Internal Server Error');
    }
    return await this.usersRepository.create(parsed);
  }
}
