import express from "express";
import { pool } from "../db";

const router = express.Router();
router.get("/", async function (req, res, next) {
  try {
    await pool.query('INSERT INTO "User" (email, tel) VALUES ($1, $2)', [
      "test_email@express.com",
      "12344321",
    ]);
    res.send("successful");
  } catch (error) {
    console.log(error);
    res.send("failed");
  }
});

export default router;
