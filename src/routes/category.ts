import express from "express";

import { categoryController } from "../controllers/category";

const categoryRouter = express.Router();
categoryRouter.get("/", categoryController.getCategories);

export default categoryRouter;
