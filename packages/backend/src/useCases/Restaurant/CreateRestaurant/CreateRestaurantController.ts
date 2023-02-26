import { Response } from 'express';
import { RequestWithUserID } from '../../../types/request';

export class CreateRestaurantController {
  async handle(req: RequestWithUserID, res: Response) {
    const data = { ...req.body, ownerId: req.userId };
    try {
      
    }
  }
}
