import prisma from "../../prisma/client";
import { AuthRegisterBody, UserUpdateBody } from "../types";
import { UserUpdateQueryBody } from "../types/server";

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
export async function getUserByIdQuery(id: number) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
}
export async function updateUserQuery(id: number, data: UserUpdateQueryBody) {
  const user = await prisma.user.update({
    where: { id },
    data,
  });
  return user;
}
export async function updateUserPasswordQuery(id: number, password: string) {
  const user = await prisma.user.update({
    where: { id },
    data: { password },
  });
  return user;
}
