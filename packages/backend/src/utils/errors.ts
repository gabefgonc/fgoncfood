export abstract class ApiError extends Error {
  statusCode: number;

  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, BadInputError.prototype);
  }
}

export class BadInputError extends ApiError {
  statusCode = 400;
}

export class InternalError extends ApiError {
  statusCode = 300;
}
