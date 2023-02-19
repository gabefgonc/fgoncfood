export abstract class BackendError extends Error {
  statusCode: number;

  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, BadInputError.prototype);
  }
}

export class BadInputError extends BackendError {
  statusCode = 400;
}

export class InternalError extends BackendError {
  statusCode = 500;
}

export class RecordNotFoundError extends BackendError {
  statusCode = 404;
}
