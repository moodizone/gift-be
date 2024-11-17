import express from "express";

import { validateRequest } from "../middlewares/validate";
import { createUserSchema, loginSchema } from "../validation";
import { usersController } from "../controllers/user";
import { authController } from "../controllers/auth";

const authRouter = express.Router();
authRouter.post("/login", validateRequest(loginSchema), authController.login);
authRouter.post(
  "/register",
  validateRequest(createUserSchema),
  usersController.createUser
);

export default authRouter;
