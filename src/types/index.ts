import { GenderEnum } from "./enum";

export interface UserType {
  id: string;
  name: string | null;
  tel: string | null;
  gender: GenderEnum | null;
  email: string | null;
}
