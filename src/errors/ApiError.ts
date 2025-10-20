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
  constructor(message: string = "Recurso não encontrado") {
    super(message, 404);
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string = "Requisição inválida") {
    super(message, 400);
  }
}
