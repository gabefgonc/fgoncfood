import { Request } from 'express';

export type RequestWithUserID = Request & { userId: string };
