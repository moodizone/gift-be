import { z } from "zod";
import { GenderEnum } from "../types/enum";

export const createUserSchema = z.object({
  tel: z.string().min(3).max(64),
  name: z.string().max(64).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).max(128),
  gender: z.nativeEnum(GenderEnum).optional(),
});
