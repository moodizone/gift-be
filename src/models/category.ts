import prisma from "../../prisma/client";

export async function getAllCategoriesQuery() {
  const categories = await prisma.category.findMany();
  return categories;
}
