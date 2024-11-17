import createHttpError from "http-errors";

import { getUserByEmailService } from "./users";
import { verifyPassword } from "../utils/hash";
import { generateAccessToken } from "../utils/auth";

export async function authServiceLogin(email: string, password: string) {
  const user = await getUserByEmailService(email);

  // there is no user associated with provided email
  if (!user) {
    throw createHttpError.NotFound();
  } else {
    const verify = await verifyPassword(password, user.password);

    // email and password do not match
    if (!verify) {
      throw createHttpError.Unauthorized();
    } else {
      const token = generateAccessToken(`${user.id}`);

      // filter sensitive data
      const { password, createAt, role, accountStatus, ...others } = user;

      return { ...others, token };
    }
  }
}
