import { CreateUserUseCase } from './CreateUserUseCase';
import { Request, Response } from 'express';
import { SerializableUser } from '../../../types/user';
import { ApiError } from '../../../utils/errors';

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(req: Request, res: Response) {
    let result: SerializableUser;
    try {
      result = await this.createUserUseCase.execute(req.body);
    } catch (e) {
      if (e instanceof ApiError) {
        return res.status(e.statusCode).json({ error: e.message });
      }

      return res.status(500).json({ error: 'Internal Server Error' });
    }

    return res.status(200).json({ result });
  }
}
