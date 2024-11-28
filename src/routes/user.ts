import express from "express";

import { usersController } from "../controllers/user";
import { validateBody, validateParams } from "../middlewares/validate";
import { updateUserSchema, userParamSchema } from "../validation";
import { authorization } from "../middlewares/authorization";

const userRouter = express.Router();
userRouter.patch(
  "/:userId",
  validateParams(userParamSchema),
  validateBody(updateUserSchema),
  authorization.user,
  usersController.updateUser
);
userRouter.get("/me", usersController.me);

export default userRouter;
