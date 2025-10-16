import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { NextFunction, Response, Request } from "express";

export function validateDTO(dto: any) {
    return async(req: Request, res: Response, next: NextFunction) => {
        const objectDTO = plainToInstance(dto, req.body); 
        const errors = await validate(objectDTO);

        if (errors.length > 0) {
            const messages = errors.flatMap((err) => Object.values(err.constraints ?? {}));
            return res.status(400).json({messages});
        }

        return next();
    }

}