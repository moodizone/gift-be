import express from "express";
import { productController } from "../controllers/product";
import { validateQuery } from "../middlewares/validate";
import { productQuerySchema } from "../validation";

// example url:
// products?category=1&category=2&category=3&rate=3&sort=2&term=laptop&page=2&limit=20
const productRouter = express.Router();
productRouter.get(
  "/",
  validateQuery(productQuerySchema),
  productController.getProduct
);

export default productRouter;
