import { PrismaClient } from "@prisma/client/";
import { Request, Response, Router } from "express";
import UserService from "../services/UserService";
import UserController from "../controllers/UserController";

const route = "/user/";

const prisma = new PrismaClient();
const service = new UserService(prisma);
const controller = new UserController(service);

export const UserRouter = (router: Router) => {

    router.get(`${route}`, async (req: Request, res: Response) => {
        await controller.getAllUsers(req, res);
    })

    router.get(`${route}:id`, async (req: Request, res: Response) => {
      await controller.getUserById(req, res);
    });

    router.post(`${route}`, async (req: Request, res: Response) => {
      await controller.createUser(req, res);
    });

    router.put(`${route}:id`, async (req: Request, res: Response) => {
      await controller.updateUser(req, res);
    });

    router.delete(`${route}:id`, async (req: Request, res: Response) => {
      await controller.deleteUser(req, res);
    });

}