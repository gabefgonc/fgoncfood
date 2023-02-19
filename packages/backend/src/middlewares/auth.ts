import { NextFunction, RequestHandler, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { JwtPayload } from 'types';
import { env } from '../env';
import { RequestWithUserID } from '../types/request';

export const protectedRoute = (
  req: RequestWithUserID,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res
      .status(401)
      .json({ error: 'You should provide an authorization header' });
  }

  const splitHeaders = authHeader.split(' ');
  if (splitHeaders.length < 2 || splitHeaders[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Invalid Authorization Header' });
  }
  const jwtToken = splitHeaders[1];
  const decoded = verify(jwtToken, env.SECRET) as JwtPayload;
  if (!decoded) {
    return res.status(401).json({ error: 'Invalid JWT' });
  }
  req.userId = decoded.userId;
  return next();
};
