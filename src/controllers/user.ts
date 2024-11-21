import { Request, Response } from "express";

import { getUsersService } from "../services/user";
import { asyncHandler } from "../middlewares/async-handler";

async function getUsers(_req: Request, res: Response) {
  const users = await getUsersService();
  res.status(200).json(users);
}
export const usersController = {
  getUsers: asyncHandler(getUsers),
};
