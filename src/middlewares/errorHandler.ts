import { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors/ApiError";
import { ValidationError } from "../errors/ApiError"; 

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  const timestamp = new Date().toISOString();
  const path = req.path;

  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({
      name: err.name,
      description: err.message,
      statusCode: err.statusCode,
      messages: err.messages,
      timestamp,
      path,
    });
  }

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      name: err.name,
      description: err.message,
      statusCode: err.statusCode,
      timestamp,
      path,
    });
  }

  return res.status(500).json({
    name: "InternalServerError",
    description: "An unexpected internal server error occurred.",
    statusCode: 500,
    timestamp,
    path,
  });
};
