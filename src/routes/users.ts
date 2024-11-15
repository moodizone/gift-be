import express from "express";

import { getUsers } from "../controllers/users";
import { asyncHandler } from "../middlewares/asyncHandler";
import { validateRequest } from "../middlewares/validate";
import { createUserSchema } from "../validation/user";

const router = express.Router();
router.get("/", asyncHandler(getUsers));
router.post("/", validateRequest(createUserSchema), asyncHandler(getUsers));

export default router;
