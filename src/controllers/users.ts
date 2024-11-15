import { NextFunction, Request, Response } from "express";

import { createUserService, getUsersService } from "../services/users";
import { CreateUserType } from "../types";

export async function getUsers(_req: Request, res: Response) {
  const users = await getUsersService();
  res.status(200).json(users);
}
export async function createUser(
  req: Request<unknown, unknown, CreateUserType>,
  res: Response
) {
  const payload = req.body;
  const newUser = await createUserService(payload);
  res.status(201).json(newUser);
}
