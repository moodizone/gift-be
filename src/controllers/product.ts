import express from "express";
import { z } from "zod";

import {
  fallbackLimit,
  fallbackPageNumber,
  productQuerySchema,
} from "../validation";
import { GetProductResponse } from "../types";
import { getProductService } from "../services/product";

async function getProduct(
  req: express.Request<
    unknown,
    unknown,
    unknown,
    z.infer<typeof productQuerySchema>
  >,
  res: express.Response<GetProductResponse>
) {
  const {
    limit = fallbackLimit,
    page = `${fallbackPageNumber}`,
    category,
    rate,
    sort,
    term,
  } = req.query;

  const result = await getProductService({
    limit,
    page,
    category,
    rate,
    sort,
    term,
  });
  res.status(200).json(result);
}

export const productController = {
  getProduct,
};
