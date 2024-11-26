import { Request, Response } from "express";

import { updateUserService } from "../services/user";
import { asyncHandler } from "../middlewares/async-handler";
import { UserUpdateBody, UserUpdateResponse } from "../types";

async function updateUser(
  req: Request<{ userId: number }, unknown, UserUpdateBody>,
  res: Response<UserUpdateResponse>
) {
  const { userId } = req.params;
  const user = await updateUserService(userId, req.body);
  res.status(200).json(user);
}

export const usersController = {
  updateUser: asyncHandler(updateUser),
};
