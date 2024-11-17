import express from "express";

import { asyncHandler } from "../middlewares/async-handler";
import { AuthLoginBody, AuthLoginResponse } from "../types";
import { authServiceLogin } from "../services/auth";

async function login(
  req: express.Request<unknown, unknown, AuthLoginBody>,
  res: express.Response<AuthLoginResponse>
) {
  const { email, password } = req.body;
  const result = await authServiceLogin(email, password);
  res.status(200).json(result);
}

export const authController = {
  login: asyncHandler(login),
};
