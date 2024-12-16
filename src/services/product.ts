import { z } from "zod";

import {
  fallbackLimit,
  fallbackPageNumber,
  productQuerySchema,
} from "../validation";
import {
  GetProductResponse,
  ProductRatingEnum,
  ProductSortEnum,
  ProductType,
} from "../types";
import { getProductCountQuery, getProductQuery } from "../models/product";

function getRatingCondition(rate?: ProductRatingEnum) {
  // [0, 2] stars
  if (rate === ProductRatingEnum.low) {
    return { gte: 0, lte: 2 };
  }
  // (2, 4) stars
  else if (rate === ProductRatingEnum.medium) {
    return { gt: 2, lt: 4 };
  }
  // [4, 5] stars
  else if (rate === ProductRatingEnum.high) {
    return { gte: 4, lte: 5 };
  }
  return undefined;
}

export async function getProductService({
  limit,
  page,
  category,
  rate,
  sort,
  term,
}: z.infer<typeof productQuerySchema>): Promise<GetProductResponse> {
  // transform datatypes
  const safePage = page ? Number(page) : fallbackPageNumber;
  const safeLimit = limit ? Number(limit) : fallbackLimit;
  const safeCategories = (() => {
    if (typeof category === "string") {
      return [Number(category)];
    } else if (Array.isArray(category)) {
      return category.map(Number);
    }
    return undefined;
  })();
  const ratingCondition = getRatingCondition(rate);

  //================================
  // filters
  //================================
  const where: any = {
    isActive: true,
  };
  if (ratingCondition) {
    where.rating = {
      ...ratingCondition,
      not: null,
    };
  }
  if (category) where.categoryId = { in: safeCategories };
  if (term) where.title = { contains: term, mode: "insensitive" };

  //================================
  // Sort
  //================================
  const orderBy = (() => {
    switch (sort) {
      case ProductSortEnum.cheap:
        where.price = {
          ...where.price,
          not: null,
        };
        return { price: "asc" };
      case ProductSortEnum.expensive:
        where.price = {
          ...where.price,
          not: null,
        };
        return { price: "desc" };
      case ProductSortEnum.commented:
        where.rateCount = {
          ...where.rateCount,
          not: null,
        };
        return { rateCount: "desc" };
      case ProductSortEnum.new:
        return { createdAt: "desc" };
      default:
        return { createdAt: "asc" };
    }
  })();

  //================================
  // Pagination
  //================================
  const skip = (safePage - 1) * safeLimit;
  const take = safeLimit;

  const list = await getProductQuery({ where, orderBy, skip, take });
  const transformedList: ProductType[] = list.map(
    ({
      id,
      title,
      description,
      categoryId,
      stock,
      rating,
      discount,
      alt,
      pics,
      price,
      rateCount,
      sourceLink,
      thumbnail,
    }) => ({
      id,
      title,
      description,
      categoryId,
      stock,
      rating,
      discount,
      alt,
      pics,
      price,
      rateCount,
      sourceLink,
      thumbnail,
    })
  );
  const count = await getProductCountQuery({ where });
  return {
    count,
    list: transformedList,
    perPage: safeLimit,
    pageNumber: safePage,
  };
}
