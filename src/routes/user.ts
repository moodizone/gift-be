import express from "express";

import { usersController } from "../controllers/user";
import { validateBody, validateParams } from "../middlewares/validate";
import { updateUserSchema, userIdSchema } from "../validation";
import { authorization } from "../middlewares/authorization";

const userRouter = express.Router();
userRouter.patch(
  "/:userId",
  validateParams(userIdSchema),
  validateBody(updateUserSchema),
  authorization.user,
  usersController.updateUser
);

export default userRouter;
