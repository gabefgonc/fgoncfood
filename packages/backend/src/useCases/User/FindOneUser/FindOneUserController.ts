import { Request, Response } from 'express';
import { SerializableUser } from '../../../types/user';
import { BackendError } from '../../../utils/errors';
import { FindOneUserUseCase } from './FindOneUserUseCase';

export class FindOneUserController {
  constructor(private findOneUserUseCase: FindOneUserUseCase) {}

  async handle(req: Request, res: Response) {
    let result: SerializableUser;
    try {
      result = await this.findOneUserUseCase.execute(req.params.id);
    } catch (e) {
      if (e instanceof BackendError) {
        return res.status(e.statusCode).json({ error: e.message });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.status(200).json({ result });
  }
}
