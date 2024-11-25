import createHttpError from "http-errors";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { getUserByEmailService } from "./user";
import { hashPassword, verifyPassword } from "../utils/hash";
import { generateAccessToken } from "../utils/auth";
import { AuthLoginResponse, AuthRegisterBody } from "../types";
import { createUserQuery } from "../models/user";

export async function authLoginService(
  email: string,
  password: string
): Promise<AuthLoginResponse> {
  const user = await getUserByEmailService(email);

  // there is no user associated with provided email
  if (!user) {
    // avoid explicitly confirming whether the email exists for security reasons
    throw createHttpError.Unauthorized();
  } else {
    const verify = await verifyPassword(password, user.password);

    // email and password do not match
    if (!verify) {
      throw createHttpError.Unauthorized();
    } else {
      const token = generateAccessToken(`${user.id}`);

      // filter sensitive data
      const { tel, name, email, gender, language, profilePicture, age, id } =
        user;

      return {
        tel,
        name,
        email,
        gender,
        token,
        language,
        profilePicture,
        age,
        id,
      };
    }
  }
}
export async function authRegisterService({
  password,
  email,
}: AuthRegisterBody): Promise<AuthLoginResponse> {
  try {
    // encrypt password before insertion
    const hashedPassword = await hashPassword(password);
    // filter sensitive data
    const newUser = await createUserQuery({
      password: hashedPassword,
      email,
    });
    const token = generateAccessToken(`${newUser.id}`);
    const {
      tel,
      name,
      email: _email,
      gender,
      language,
      profilePicture,
      age,
      id,
    } = newUser;
    return {
      tel,
      name,
      email: _email,
      gender,
      language,
      profilePicture,
      age,
      id,
      token,
    };
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
