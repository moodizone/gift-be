import express from "express";

import { asyncHandler } from "../middlewares/async-handler";
import {
  AuthEmailAvailabilityBody,
  AuthLoginBody,
  AuthLoginResponse,
} from "../types";
import { authServiceLogin } from "../services/auth";
import { getUserByEmailService } from "../services/users";
import createHttpError from "http-errors";

async function login(
  req: express.Request<unknown, unknown, AuthLoginBody>,
  res: express.Response<AuthLoginResponse>
) {
  const { email, password } = req.body;
  const result = await authServiceLogin(email, password);
  res.status(200).json(result);
}
async function emailAvailability(
  req: express.Request<unknown, unknown, AuthEmailAvailabilityBody>,
  res: express.Response
) {
  const { email } = req.body;
  const result = await getUserByEmailService(email);

  if (!result) {
    res.sendStatus(200);
  } else {
    res.sendStatus(createHttpError.Conflict().status);
  }
}

export const authController = {
  login: asyncHandler(login),
  emailAvailability: asyncHandler(emailAvailability),
};
