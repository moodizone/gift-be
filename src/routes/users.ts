import express from "express";

const router = express.Router();
router.get("/", function (req, res, next) {
  throw new Error("BROKEN");
  res.send("respond with a resource");
});

export default router;
