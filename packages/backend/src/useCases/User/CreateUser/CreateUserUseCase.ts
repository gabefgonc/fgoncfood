import { createUserDTO, CreateUserDTO } from 'types';
import { ZodError } from 'zod';
import { IUsersRepository } from '../../../repositories/IUsersRepository';
import {
  BadInputError,
  InternalError,
  RecordAlreadyExistsError,
} from '../../../utils/errors';

export class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: CreateUserDTO) {
    let parsed: CreateUserDTO;
    try {
      parsed = createUserDTO.parse(data);
    } catch (e) {
      if (e instanceof ZodError) {
        throw new BadInputError(e.issues[0].message);
      }
      throw new InternalError('Internal Server Error');
    }
    const alreadyExists = await this.usersRepository.findByEmailOrPhoneNumber({
      phoneNumber: data.phoneNumber,
      email: data.email,
    });

    if (alreadyExists) {
      throw new RecordAlreadyExistsError('User already exists');
    }

    return await this.usersRepository.create(parsed);
  }
}
