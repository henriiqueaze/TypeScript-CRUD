export class ApiError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = "User not found!") {
    super(message, 404);
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string = "Invalid Request!") {
    super(message, 400);
  }
}

export class ValidationError extends ApiError {
  public messages: string[];

  constructor(description: string, messages: string[]) {
    super(description, 400);
    this.name = "ValidationError";
    this.messages = messages;
  }
}
