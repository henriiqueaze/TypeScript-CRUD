import { Optional } from "@prisma/client/runtime/library";
import { PrismaClient, User } from "../../generated/prisma";
import {
  getPaginationParams,
  hashPassword,
  userExists,
} from "../utils/UserUtils";

export default class UserService {
  constructor(private readonly prisma: PrismaClient) {}

  async getUserById(id: string) {
    await userExists(id);

    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    return user;
  }

  async getAllUsers(page = 1, size = 10, direction: "asc" | "desc" = "asc") {
    const { skip, take, order } = getPaginationParams(page, size, direction);

    return this.prisma.user.findMany({
      skip,
      take,
      orderBy: { name: order },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        status: true,
      },
    });
  }

  async createUser(user: Optional<User, "id">) {
    const hashedPassword = await hashPassword(user.password);

    const newUser = await this.prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: hashedPassword,
      },
    });

    return newUser;
  }

  async updateUser(id: string, user: Optional<User, "id">) {
    await userExists(id);

    const hashedPassword = await hashPassword(user.password);

    const updatedData = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        email: user.email,
        name: user.name,
        password: hashedPassword,
      },
    });

    return updatedData;
  }

  async updateUserField(id: string, data: Partial<User>) {
    await userExists(id);

    if (data.password) {
      data.password = await hashPassword(data.password);
    }

    const updatedData = await this.prisma.user.update({
      where: {
        id: id,
      },
      data,
    });

    return updatedData;
  }

  async deleteUser(id: string) {
    await userExists(id);

    await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
