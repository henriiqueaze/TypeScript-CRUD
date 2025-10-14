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
    const users = await this.service.getAllUsers();

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

    const updatedUser = await this.service.updateUser(id, updatedContent);

    res.status(200).json(updatedUser);
  }

  async deleteUser(req: Request, res: Response) {
    const id = req.params.id as string;

    await this.service.deleteUser(id);

    res.status(204).send();
  };
}
