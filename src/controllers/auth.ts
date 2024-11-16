import express from "express";
import createHttpError from "http-errors";

import { asyncHandler } from "../middlewares/async-handler";
import { getUserByTelService } from "../services/users";
import { LoginBody } from "../types";
import { verifyPassword } from "../utils/hash";
import { generateAccessToken } from "../utils/auth";

// TODO: reset password
// TODO: rate limit

async function login(
  req: express.Request<unknown, unknown, LoginBody>,
  res: express.Response
) {
  const { password, tel } = req.body;
  const user = await getUserByTelService(tel);

  if (!user) {
    res.sendStatus(createHttpError.NotFound().status);
  } else {
    const verify = await verifyPassword(password, user?.password);

    if (!verify) {
      res.sendStatus(createHttpError.Unauthorized().status);
    } else {
      const { password, ...otherInfo } = user;
      const token = generateAccessToken(user.id);
      res.status(200).json({ ...otherInfo, token });
    }
  }
}

export const authController = {
  login: asyncHandler(login),
};
