import express from "express";
import { pool } from "../configs/db";
import { getUsers } from "../controllers/users";

const router = express.Router();
router.get("/", getUsers);

export default router;
