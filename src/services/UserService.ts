import { Optional } from "@prisma/client/runtime/library";
import { PrismaClient, User } from "../../generated/prisma";

export default class UserService {
  constructor(private readonly prisma: PrismaClient) {}

  async getUserById(id: string) {
    const user = this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    return user;
  }

  async getAllUsers() {
    const users = this.prisma.user.findMany();
    return users;
  }

  async createUser(user: Optional<User, "id">) {
    const newUser = await this.prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: user.password,
      },
    });

    return newUser;
  }

  async updateUser(id: string, user: Optional<User, "id">) {
    const updatedData = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        email: user.email,
        name: user.name,
        password: user.password,
      },
    });

    return updatedData;
  }

  async deleteUser(id: string) {
    await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
