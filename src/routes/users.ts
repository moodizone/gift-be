import express from "express";

import { getUsers } from "../controllers/users";
import { asyncHandler } from "../utils/asyncHandler";
import { validateRequest } from "../validation";
import { createUserSchema } from "../validation/user";

const router = express.Router();
router.get("/", asyncHandler(getUsers));
router.post("/", validateRequest(createUserSchema), asyncHandler(getUsers));

export default router;
