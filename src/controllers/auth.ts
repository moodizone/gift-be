import express from "express";
import createHttpError from "http-errors";

import { asyncHandler } from "../middlewares/async-handler";
import { getUserByEmailService } from "../services/users";
import { verifyPassword } from "../utils/hash";
import { generateAccessToken } from "../utils/auth";
import { AuthLoginBody } from "../types";

// TODO: reset password
// TODO: rate limit

async function login(
  req: express.Request<unknown, unknown, AuthLoginBody>,
  res: express.Response
) {
  const { password, email } = req.body;
  const user = await getUserByEmailService(email);

  // there is no user associated with provided email
  if (!user) {
    res.sendStatus(createHttpError.NotFound().status);
  } else {
    const verify = await verifyPassword(password, user?.password);

    // email and password do not match
    if (!verify) {
      res.sendStatus(createHttpError.Unauthorized().status);
    } else {
      const token = generateAccessToken(`${user.id}`);
      res.status(200).json({ ...user, token });
    }
  }
}

export const authController = {
  login: asyncHandler(login),
};
