import { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors/ApiError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction 
) => {
  console.error(err);

  const timestamp = new Date().toISOString();
  const path = req.path;

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
    description: "Ocorreu um erro interno inesperado no servidor.",
    statusCode: 500,
    timestamp,
    path,
  });
};
