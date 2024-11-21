import prisma from "../../prisma/client";
import { AuthRegisterBody } from "../types";

export async function getUsersQuery() {
  const users = await prisma.user.findMany();
  return users;
}
export async function createUserQuery({ email, password }: AuthRegisterBody) {
  const user = await prisma.user.create({
    data: {
      email,
      password,
    },
  });
  return user;
}
export async function getUserByEmailQuery(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
}
