import bcrypt from 'bcrypt';
import { Prisma } from "../../generated/prisma";

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
}

export const getPaginationParams = (
    page: number,
    size: number,
    direction: "asc" | "desc"
  ) => {
    const skip = (page - 1) * size;
    const take = size;
    const order: Prisma.SortOrder = direction === "desc" ? "desc" : "asc";

    return { skip, take, order };
  }