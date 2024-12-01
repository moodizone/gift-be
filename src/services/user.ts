import createHttpError from "http-errors";

import {
  getUserByEmailQuery,
  getUserByIdQuery,
  updateUserPasswordQuery,
  updateUserQuery,
} from "../models/user";
import {
  UserUpdateBody,
  UserUpdatePasswordBody,
  UserUpdateResponse,
} from "../types";
import { dateToISO, ISOtoDate } from "../utils/date";
import { hashPassword, verifyPassword } from "../utils/hash";

export async function getUserByEmailService(email: string) {
  const result = await getUserByEmailQuery(email);
  return result;
}
export async function getUserByIdService(id: number) {
  const result = await getUserByIdQuery(id);
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

  const {
    birthday,
    email,
    gender,
    language,
    firstName,
    lastName,
    profilePicture,
    tel,
    bio,
    address,
  } = await updateUserQuery(id, {
    ...payload,
    birthday: ISOtoDate(payload.birthday),
  });
  return {
    bio,
    address,
    birthday: dateToISO(birthday),
    email,
    gender,
    id,
    language,
    firstName,
    lastName,
    profilePicture,
    tel,
  };
}
export async function updateUserPasswordService(
  id: number,
  { newPassword, oldPassword }: UserUpdatePasswordBody
) {
  const user = await getUserByIdQuery(id);

  // similar to login service, avoid explicitly confirming whether the `id` exists
  if (!user) {
    throw createHttpError.Unauthorized();
  }

  const verify = await verifyPassword(oldPassword, user.password);

  if (!verify) {
    throw createHttpError.Unauthorized();
  }

  const hashedPassword = await hashPassword(newPassword);
  const result = await updateUserPasswordQuery(id, hashedPassword);
  return result;
}
