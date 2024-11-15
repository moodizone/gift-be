import express from "express";

import { validateRequest } from "../middlewares/validate";
import { createUserSchema } from "../validation/user";
import { usersController } from "../controllers/users";

const router = express.Router();
router.get("/", usersController.getUsers);
router.post("/", validateRequest(createUserSchema), usersController.createUser);

export default router;
