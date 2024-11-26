import express from "express";

import { validateBody } from "../middlewares/validate";
import {
  createUserSchema,
  emailAvailabilitySchema,
  loginSchema,
} from "../validation";
import { usersController } from "../controllers/user";
import { authController } from "../controllers/auth";

const authRouter = express.Router();
authRouter.post("/login", validateBody(loginSchema), authController.login);
authRouter.post(
  "/register",
  validateBody(createUserSchema),
  authController.register
);
authRouter.post(
  "/email-availability",
  validateBody(emailAvailabilitySchema),
  authController.emailAvailability
);

export default authRouter;
