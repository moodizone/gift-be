import express from "express";

import { usersController } from "../controllers/users";

const usersRouter = express.Router();
usersRouter.get("/", usersController.getUsers);

export default usersRouter;
