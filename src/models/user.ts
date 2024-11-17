import prisma from "../../prisma/client";
import { UserCreateBody } from "../types";

export async function getUsersQuery() {
  const users = await prisma.user.findMany();
  return users;
}
export async function createUserQuery({
  email,
  password,
  age,
  gender,
  name,
  role,
  tel,
}: UserCreateBody) {
  const user = await prisma.user.create({
    data: {
      email,
      password,
      age,
      gender,
      name,
      role,
      tel,
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
