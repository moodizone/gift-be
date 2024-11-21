import express from "express";

import { asyncHandler } from "../middlewares/async-handler";
import {
  AuthEmailAvailabilityBody,
  AuthLoginBody,
  AuthLoginResponse,
  AuthRegisterBody,
} from "../types";
import { authLoginService, authRegisterService } from "../services/auth";
import { getUserByEmailService } from "../services/user";
import createHttpError from "http-errors";

async function login(
  req: express.Request<unknown, unknown, AuthLoginBody>,
  res: express.Response<AuthLoginResponse>
) {
  const { email, password } = req.body;
  const result = await authLoginService(email, password);
  res.status(200).json(result);
}
async function register(
  req: express.Request<unknown, unknown, AuthRegisterBody>,
  res: express.Response<AuthLoginResponse>
) {
  const payload = req.body;
  const newUser = await authRegisterService(payload);
  res.status(201).json(newUser);
}

async function emailAvailability(
  req: express.Request<unknown, unknown, AuthEmailAvailabilityBody>,
  res: express.Response
) {
  const { email } = req.body;
  const result = await getUserByEmailService(email);

  if (!result) {
    res.status(200).json({});
  } else {
    const error = createHttpError.Conflict();
    res.status(error.statusCode).json({ message: error.message });
  }
}

export const authController = {
  login: asyncHandler(login),
  register: asyncHandler(register),
  emailAvailability: asyncHandler(emailAvailability),
};
