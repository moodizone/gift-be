import { gender, userRole } from "@prisma/client";
import { z } from "zod";

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  // prevent printing list of enums as within error message
  if (issue.code === z.ZodIssueCode.invalid_enum_value) {
    return { message: "Invalid value. Select a valid option" };
  }

  return { message: ctx.defaultError };
};

z.setErrorMap(customErrorMap);

const telSchema = z.string().min(3).max(256).optional();
const nameSchema = z.string().max(256).optional();
const emailSchema = z.string().email().max(256);
const passwordSchema = z.string().min(6).max(256);
const roleSchema = z.nativeEnum(userRole).optional();
const genderSchema = z.nativeEnum(gender).optional();
const ageSchema = z.number().int().positive().optional();

export const createUserSchema = z.object({
  tel: telSchema,
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  gender: genderSchema,
  age: ageSchema,
  role: roleSchema,
});
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
export const emailAvailabilitySchema = z.object({
  email: emailSchema,
});
