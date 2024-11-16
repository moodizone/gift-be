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
