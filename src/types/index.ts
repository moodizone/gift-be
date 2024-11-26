import { accountStatus, gender, language, userRole } from "@prisma/client";
export interface ErrorType {
  message: string | Array<Record<string, string>>;
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
  language: language | null;
}
export interface AuthRegisterBody {
  email: string;
  password: string;
}
export type AuthRegisterResponse = AuthLoginResponse;
export interface AuthEmailAvailabilityBody {
  email: string;
}
export interface UserUpdateBody {
  tel?: string;
  name?: string;
  gender?: gender;
  age?: number;
}
export type UserUpdateResponse = Omit<AuthLoginResponse, "token">;
