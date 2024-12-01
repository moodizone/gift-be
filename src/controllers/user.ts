import { Request, Response } from "express";

import {
  getUserByIdService,
  updateUserPasswordService,
  updateUserService,
} from "../services/user";
import { asyncHandler } from "../middlewares/async-handler";
import {
  ErrorType,
  UserMeResponse,
  UserUpdateBody,
  UserUpdatePasswordBody,
  UserUpdatePasswordResponse,
  UserUpdateResponse,
} from "../types";
import { RequestCustom } from "../types/server";
import { userIdSchema } from "../validation";
import { dateToISO } from "../utils/date";
import createHttpError from "http-errors";

async function updateUser(
  req: Request<{ userId: string }, unknown, UserUpdateBody>,
  res: Response<UserUpdateResponse>
) {
  const { userId } = req.params;
  const user = await updateUserService(Number(userId), req.body);
  res.status(200).json(user);
}
async function me(
  req: RequestCustom,
  res: Response<UserMeResponse | ErrorType>
) {
  const error = createHttpError.Unauthorized();
  const { success } = userIdSchema.safeParse(req.userId);

  if (success) {
    const user = await getUserByIdService(req.userId as number);

    if (user) {
      const {
        address,
        bio,
        birthday,
        email,
        firstName,
        gender,
        id,
        language,
        lastName,
        profilePicture,
        tel,
      } = user;
      res.status(200).json({
        address,
        bio,
        birthday: dateToISO(birthday),
        email,
        firstName,
        gender,
        id,
        language,
        lastName,
        profilePicture,
        tel,
      });
      return;
    }
  }
  res.status(error.status).json({ message: error.message });
}
export async function updatePassword(
  req: Request<{ userId: string }, unknown, UserUpdatePasswordBody>,
  res: Response<UserUpdatePasswordResponse>
) {
  const { userId } = req.params;
  await updateUserPasswordService(Number(userId), req.body);
  res.status(200).json({});
}

export const usersController = {
  updateUser: asyncHandler(updateUser),
  me: asyncHandler(me),
  changePassword: asyncHandler(updatePassword),
};
