import * as express from "express";

import { getCategoriesService } from "../services/category";
import { GetCategoryResponse } from "../types";

async function getCategories(
  _req: express.Request,
  res: express.Response<GetCategoryResponse[]>
) {
  const result = await getCategoriesService();
  res.status(200).json(result);
}

export const categoryController = {
  getCategories,
};
