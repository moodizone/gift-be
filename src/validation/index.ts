import { gender, userRole } from "@prisma/client";
import { z } from "zod";

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
