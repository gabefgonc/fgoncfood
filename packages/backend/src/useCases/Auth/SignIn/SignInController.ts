import { Request, Response } from 'express';
import { BackendError } from '../../../utils/errors';
import { SignInUseCase } from './SignInUseCase';

export class SignInController {
  constructor(private signInUseCase: SignInUseCase) {}

  async handle(req: Request, res: Response) {
    let token: string;
    try {
      token = await this.signInUseCase.execute(req.body, req.body.password);
    } catch (e) {
      if (e instanceof BackendError) {
        return res.status(e.statusCode).json({ error: e.message });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.status(200).json({ token });
  }
}
