import { Request, Response } from "express";

import { createUserService, getUsersService } from "../services/users";
import { asyncHandler } from "../middlewares/async-handler";
import { UserCreateBody } from "../types";

async function getUsers(_req: Request, res: Response) {
  const users = await getUsersService();
  res.status(200).json(users);
}
async function createUser(
  req: Request<unknown, unknown, UserCreateBody>,
  res: Response
) {
  const payload = req.body;
  const newUser = await createUserService(payload);
  res.status(201).json(newUser);
}

export const usersController = {
  getUsers: asyncHandler(getUsers),
  createUser: asyncHandler(createUser),
};
