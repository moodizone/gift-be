import express from "express";

import { usersController } from "../controllers/user";
import { validateBody, validateParams } from "../middlewares/validate";
import { updateUserSchema, userIdSchema } from "../validation";

const userRouter = express.Router();
userRouter.patch(
  "/:id",
  validateParams(userIdSchema),
  validateBody(updateUserSchema),
  usersController.updateUser
);

export default userRouter;
