import { NextFunction, Request, Response } from "express";
import { getUsersService } from "../services/users";

export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await getUsersService();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}
