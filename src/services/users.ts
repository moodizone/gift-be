import { DatabaseError } from "pg";
import createHttpError from "http-errors";

import {
  createUserQuery,
  getUserByTelQuery,
  getUsersQuery,
} from "../models/users";
import { CreateUserType } from "../types";
import { hashPassword } from "../utils/hash";

export async function getUsersService() {
  return getUsersQuery();
}
export async function createUserService({
  password,
  ...others
}: CreateUserType) {
  try {
    // encrypt password before insertion
    const hashedPassword = await hashPassword(password);
    const result = await createUserQuery({
      password: hashedPassword,
      ...others,
    });
    return result;
  } catch (error) {
    if (error instanceof DatabaseError) {
      // unique violation rule
      if (error.code === "23505") {
        if (error.constraint?.includes("email")) {
          throw createHttpError.Conflict("Email already in use");
        } else if (error.constraint?.includes("tel")) {
          throw createHttpError.Conflict("Mobile already in use");
        }
      }
    }
    throw error;
  }
}
export async function getUserByTelService(tel: string) {
  const result = await getUserByTelQuery(tel);

  if (result.length === 0) {
    return null;
  } else if (result.length > 1) {
    console.log(`❗ ${result.length} users found with same tel: ${tel}`);
  }
  return result[0];
}
