import { gender, userRole } from "@prisma/client";
import { z } from "zod";

import { LimitEnum, ProductRatingEnum, ProductSortEnum } from "../types";

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  // prevent printing list of enums as within error message
  if (issue.code === z.ZodIssueCode.invalid_enum_value) {
    return { message: "Invalid value. Select a valid option" };
  }

  return { message: ctx.defaultError };
};
z.setErrorMap(customErrorMap);

export const fallbackPageNumber = 1;
export const fallbackLimit = LimitEnum.few;
const telSchema = z.string().min(3).max(256).optional();
const firstNameSchema = z.string().max(256).optional();
const lastNameSchema = z.string().max(256).optional();
const emailSchema = z.string().email().max(256);
const passwordSchema = z.string().min(6).max(256);
const roleSchema = z.nativeEnum(userRole).optional();
const genderSchema = z.nativeEnum(gender).optional();
export const userIdSchema = z.number().int().positive();
const categorySchema = z.number().int().positive();
const dateSchema = z.string().datetime().pipe(z.coerce.date());
const pageSchema = z.number().int().positive();
const limitSchema = z.nativeEnum(LimitEnum).optional().default(fallbackLimit);
const boundedDateSchema = dateSchema.superRefine((date, { path, addIssue }) => {
  const fieldName = `${path[0]}`;

  // reject future date
  if (date > new Date()) {
    addIssue({
      code: z.ZodIssueCode.custom,
      path,
      message: `${fieldName} cannot be in the future`,
    });
  }

  const hundredYearsAgo = new Date();
  hundredYearsAgo.setFullYear(hundredYearsAgo.getFullYear() - 200);

  // reject too old date
  if (date < hundredYearsAgo) {
    addIssue({
      code: z.ZodIssueCode.custom,
      path,
      message: `${fieldName} cannot be more than 200 years ago`,
    });
  }
});
const optionalBoundedDateSchema = z
  .string()
  .optional()
  .refine((value) => {
    if (!Boolean(value)) return true;

    const { success } = boundedDateSchema.safeParse(value);
    return success;
  });
const optionalTelSchema = z
  .string()
  .optional()
  .refine((value) => {
    if (!Boolean(value)) return true;

    const { success } = telSchema.safeParse(value);
    return success;
  });

export const createUserSchema = z.object({
  tel: optionalTelSchema,
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  email: emailSchema,
  password: passwordSchema,
  gender: genderSchema,
  birthday: optionalBoundedDateSchema,
  role: roleSchema,
});
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
export const emailAvailabilitySchema = z.object({
  email: emailSchema,
});
export const updateUserSchema = z.object({
  tel: optionalTelSchema,
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  gender: genderSchema,
  birthday: optionalBoundedDateSchema,
});
export const userParamSchema = z.object({
  userId: z.preprocess((val) => Number(val), userIdSchema),
});
export const userPasswordSchema = z.object({
  newPassword: passwordSchema,
  oldPassword: passwordSchema,
});
export const productQuerySchema = z.object({
  category: z
    .union([
      z.string().refine((v) => {
        const { success } = categorySchema.safeParse(Number(v));
        return success;
      }),
      z
        .string()
        .array()
        .refine((v) => {
          const numericArray = v.map(Number);
          const { success } = z.array(categorySchema).safeParse(numericArray);
          return success;
        }),
    ])
    .optional(),
  rate: z.nativeEnum(ProductRatingEnum).optional(),
  sort: z.nativeEnum(ProductSortEnum).optional(),
  term: z.string().min(3).max(256).optional(),
  page: z
    .string()
    .refine((v) => {
      const { success } = pageSchema.safeParse(Number(v));
      return success;
    })
    .optional(),
  limit: z
    .string()
    .refine((v) => {
      const { success } = limitSchema.safeParse(Number(v));
      return success;
    })
    .optional(),
});
