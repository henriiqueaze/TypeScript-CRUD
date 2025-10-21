import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { NextFunction, Response, Request } from "express";
import { ValidationError } from "../errors/ApiError";

export function validateDTO(dto: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const objectDTO = plainToInstance(dto, req.body);
    const errors = await validate(objectDTO);

    if (errors.length > 0) {
      const messages = errors.flatMap((err) =>
        Object.values(err.constraints ?? {})
      );

      const error = new ValidationError("Validation failed.", messages);
      return next(error);
    }

    return next();
  };
}
