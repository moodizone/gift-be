import { accountStatus, gender, userRole } from "@prisma/client";

export interface UserCreateBody {
  email: string;
  password: string;
  age?: number;
  gender?: gender;
  name?: string;
  role?: userRole;
  tel?: string;
}
export interface UserCreateResponse {
  email: string;
  age: number | null;
  gender: gender | null;
  name: string | null;
  profilePicture: string | null;
  tel: string | null;
}
export interface AuthLoginBody {
  email: string;
  password: string;
}
