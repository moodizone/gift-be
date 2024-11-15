import { DatabaseError } from "pg";

import { createUserQuery, getUsersQuery } from "../models/users";
import { CreateUserType } from "../types";
import { hashPassword } from "../utils/hash";
import { APIError } from "../utils/error";

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
    const result = createUserQuery({ password: hashedPassword, ...others });
    return result;
  } catch (error) {
    if (error instanceof DatabaseError) {
      // unique violation rule
      if (error.code === "23505") {
        if (error.constraint?.includes("email")) {
          throw new APIError("Email already exists.", 400);
        } else if (error.constraint?.includes("tel")) {
          throw new APIError("Mobile already exists.", 400);
        }
      }
    }
    throw error;
  }
}
