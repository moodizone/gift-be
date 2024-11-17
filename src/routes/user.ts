import express from "express";

import { usersController } from "../controllers/user";

const userRouter = express.Router();
userRouter.get("/", usersController.getUsers);

export default userRouter;
