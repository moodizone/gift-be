import prisma from "../../prisma/client";

export async function getProductQuery({ where, orderBy, skip, take }: any) {
  const result = await prisma.product.findMany({
    where,
    orderBy,
    skip,
    take,
  });
  return result;
}
export async function getProductCountQuery({ where }: any) {
  const result = await prisma.product.count({
    where,
  });
  return result;
}
