import createHttpError from "http-errors";

import { hashPassword } from "../utils/hash";
import {
  createUserQuery,
  getUserByEmailQuery,
  getUsersQuery,
} from "../models/user";
import { UserCreateBody, UserCreateResponse } from "../types";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function getUsersService() {
  return getUsersQuery();
}
export async function createUserService({
  password,
  ...others
}: UserCreateBody): Promise<UserCreateResponse> {
  try {
    // encrypt password before insertion
    const hashedPassword = await hashPassword(password);

    // filter sensitive data
    const {
      accountStatus,
      role,
      createAt,
      password: pwd,
      ...result
    } = await createUserQuery({
      password: hashedPassword,
      ...others,
    });
    return result;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      // unique violation rule
      if (
        error.code === "P2002" &&
        error.meta &&
        Array.isArray(error.meta.target)
      ) {
        if (error.meta.target.includes("email")) {
          throw createHttpError.Conflict("Email already in use");
        } else if (error.meta.target.includes("tel")) {
          throw createHttpError.Conflict("Mobile already in use");
        }
      }
    }
    throw error;
  }
}
export async function getUserByEmailService(email: string) {
  const result = await getUserByEmailQuery(email);
  return result;
}
