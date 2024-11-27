import createHttpError from "http-errors";

import {
  getUserByEmailQuery,
  getUserByIdQuery,
  updateUserQuery,
} from "../models/user";
import { UserUpdateBody, UserUpdateResponse } from "../types";
import { dateToISO, ISOtoDate } from "../utils/date";

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
