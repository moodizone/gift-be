import express from "express";
import createHttpError from "http-errors";

import { asyncHandler } from "../middlewares/async-handler";
import { getUserByEmailService } from "../services/users";
import { verifyPassword } from "../utils/hash";
import { generateAccessToken } from "../utils/auth";
import { AuthLoginBody, AuthLoginResponse } from "../types";

async function login(
  req: express.Request<unknown, unknown, AuthLoginBody>,
  res: express.Response<AuthLoginResponse>
) {
  const { password, email } = req.body;
  const user = await getUserByEmailService(email);

  // there is no user associated with provided email
  if (!user) {
    res.sendStatus(createHttpError.NotFound().status);
  } else {
    const verify = await verifyPassword(password, user.password);

    // email and password do not match
    if (!verify) {
      res.sendStatus(createHttpError.Unauthorized().status);
    } else {
      const token = generateAccessToken(`${user.id}`);

      // filter sensitive data
      const { password, createAt, role, accountStatus, ...others } = user;

      res.status(200).json({ ...others, token });
    }
  }
}

export const authController = {
  login: asyncHandler(login),
};
