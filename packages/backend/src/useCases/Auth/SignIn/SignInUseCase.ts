import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { AuthorizationError } from '../../../utils/errors';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { env } from '../../../env';

export class SignInUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(
    identity: { email?: string; phoneNumber?: string },
    password: string
  ) {
    const userExists = await this.usersRepository.findByEmailOrPhoneNumber(
      identity
    );
    if (!userExists) {
      throw new AuthorizationError('Wrong Credentials');
    }
    const passwordMatch = await compare(password, userExists.password);
    if (!passwordMatch) {
      throw new AuthorizationError('Wrong Credentials');
    }

    const token = sign({ userId: userExists.id }, env.SECRET, {
      expiresIn: '3d',
    });

    return token;
  }
}
