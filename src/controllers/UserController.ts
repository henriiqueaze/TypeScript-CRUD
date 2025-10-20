import UserService from "../services/UserService";
import { Request, Response } from "express";

export default class UserController {
  constructor(private readonly service: UserService) {}

  async getUserById(req: Request, res: Response) {
    const id = req.params.id as string;

    const user = await this.service.getUserById(id);

    res.status(200).json(user);
  }

  async getAllUsers(req: Request, res: Response) {
    const page = Number(req.query.page) || 1;
    const size = Number(req.query.size) || 10;
    const direction = (req.query.direction as "asc" | "desc") || "asc";

    const users = await this.service.getAllUsers(page, size, direction);
    res.status(200).json(users);
  }

  async createUser(req: Request, res: Response) {
    const userContent = req.body;

    const newUser = await this.service.createUser(userContent);

    res.status(201).json(newUser);
  }

  async updateUser(req: Request, res: Response) {
    const id = req.params.id as string;
    const updatedContent = req.body;

    const updatedUser = await this.service.updateUserField(id, updatedContent);

    res.status(200).json(updatedUser);
  }

  async updateUserField(req: Request, res: Response) {
    const id = req.params.id as string;
    const updatedContent = req.body;

    const updatedUser = await this.service.updateUserField(id, updatedContent);

    res.status(200).json(updatedUser);
  }

  async deleteUser(req: Request, res: Response) {
    const id = req.params.id as string;

    await this.service.deleteUser(id);

    res.status(204).send();
  }
}
