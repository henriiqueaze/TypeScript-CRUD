import { PrismaClient } from "../../generated/prisma";
import { Request, Response, Router } from "express";
import UserService from "../services/UserService";
import UserController from "../controllers/UserController";
import { validateDTO } from "../middlewares/user-validation";
import { UserDTO } from "../dtos/user.dto";

const route = "/user/";

const prisma = new PrismaClient();
const service = new UserService(prisma);
const controller = new UserController(service);

export const UserRouter = (router: Router) => {
  router.get(`${route}`, async (req: Request, res: Response) => {
    return controller.getAllUsers(req, res);
  });

  router.get(`${route}:id`, async (req: Request, res: Response) => {
    return controller.getUserById(req, res);
  });

  router.post(
    `${route}`,
    validateDTO(UserDTO),
    async (req: Request, res: Response) => {
      return controller.createUser(req, res);
    }
  );

  router.put(
    `${route}:id`,
    validateDTO(UserDTO),
    async (req: Request, res: Response) => {
      return controller.updateUser(req, res);
    }
  );

  router.delete(`${route}:id`, async (req: Request, res: Response) => {
    return controller.deleteUser(req, res);
  });
};
