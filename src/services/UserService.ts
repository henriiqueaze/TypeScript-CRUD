import { Optional } from "@prisma/client/runtime/library";
import { PrismaClient, User } from "../../generated/prisma";
import { hashPassword } from "../utils/UserUtils";

export default class UserService {
  constructor(private readonly prisma: PrismaClient) {}

  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({
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

  async deleteUser(id: string) {
    await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
