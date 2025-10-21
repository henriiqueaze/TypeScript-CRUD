import bcrypt from "bcrypt";
import { Prisma } from "../../generated/prisma";
import { NotFoundError } from "../errors/ApiError";
import { PrismaClient } from "@prisma/client";

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

export const getPaginationParams = (
  page: number,
  size: number,
  direction: "asc" | "desc"
) => {
  const skip = (page - 1) * size;
  const take = size;
  const order: Prisma.SortOrder = direction === "desc" ? "desc" : "asc";

  return { skip, take, order };
};

export const userExists = async (id: string) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (user == null) throw new NotFoundError("User not found!");
};
