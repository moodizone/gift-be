import { z } from "zod";
import { GenderEnum } from "../types/enum";

const telSchema = z.string().min(3).max(64);
const nameSchema = z.string().max(64).optional();
const emailSchema = z.string().email().optional();
const passwordSchema = z.string().min(6).max(128);
const genderSchema = z.nativeEnum(GenderEnum).optional();

export const createUserSchema = z.object({
  tel: telSchema,
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  gender: genderSchema,
});
export const loginSchema = z.object({
  tel: telSchema,
  password: passwordSchema,
});
