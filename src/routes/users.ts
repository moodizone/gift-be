import express from "express";

import { getUsers } from "../controllers/users";
import { asyncHandler } from "../utils/asyncHandler";

const router = express.Router();
router.get("/", asyncHandler(getUsers));

export default router;
