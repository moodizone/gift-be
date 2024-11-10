import express from "express";

const router = express.Router();
router.get("/", function (req, res, next) {
  console.log(__dirname);
  res.render("index", { title: "Express" });
});

export default router;
