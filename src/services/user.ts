import createHttpError from "http-errors";

import {
  getUserByEmailQuery,
  getUserByIdQuery,
  updateUserQuery,
} from "../models/user";
import { UserUpdateBody, UserUpdateResponse } from "../types";

export async function getUserByEmailService(email: string) {
  const result = await getUserByEmailQuery(email);
  return result;
}
export async function updateUserService(
  id: number,
  payload: UserUpdateBody
): Promise<UserUpdateResponse> {
  const user = await getUserByIdQuery(id);

  if (!user) {
    throw createHttpError.NotFound();
  }

  const { age, email, gender, language, name, profilePicture, tel } =
    await updateUserQuery(id, payload);
  return {
    age,
    email,
    gender,
    id,
    language,
    name,
    profilePicture,
    tel,
  };
}
