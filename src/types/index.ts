import { accountStatus, gender, userRole } from "@prisma/client";
export interface ErrorType {
  message: string | Array<Record<string, string>>;
}
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
export interface AuthLoginResponse {
  email: string;
  id: number;
  tel: string | null;
  name: string | null;
  gender: gender | null;
  age: number | null;
  profilePicture: string | null;
  token: string;
}
export interface AuthEmailAvailabilityBody {
  email: string;
}
