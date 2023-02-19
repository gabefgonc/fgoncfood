import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { RecordNotFoundError } from '../../../utils/errors';

export class FindOneUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(id: string) {
    const result = await this.usersRepository.findByID(id);
    if (!result) {
      throw new RecordNotFoundError('User not found');
    }
    return result;
  }
}
