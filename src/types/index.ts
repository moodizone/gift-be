import { accountStatus, gender, userRole } from "@prisma/client";
export interface ErrorType {
  message: string | Array<Record<string, string>>;
}
export interface AuthRegisterBody {
  email: string;
  password: string;
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
