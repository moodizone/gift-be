import { GenderEnum } from "./enum";

//=====================================
// User
//=====================================
export interface UserType {
  id: string;
  name: string | null;
  tel: string | null;
  gender: GenderEnum | null;
  email: string | null;
  password: string;
}
export type CreateUserType = Omit<UserType, "id">;
export type AccountDetails = Omit<UserType, "password">;
export interface LoginBody {
  tel: string;
  password: string;
}
export interface LoginResponse extends AccountDetails {
  token: string;
}
