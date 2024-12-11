import { getAllCategoriesQuery } from "../models/category";
import { GetCategoryResponse } from "../types";

export async function getCategoriesService(): Promise<GetCategoryResponse[]> {
  const result = await getAllCategoriesQuery();
  return result.map(({ subCategories, superCategory, id, name }) => ({
    id,
    subCategories,
    superCategory,
    title: name,
  }));
}
