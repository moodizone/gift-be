import { pool } from "../configs/db";
import { CreateUserType, UserType } from "../types";

export async function getUsersQuery() {
  const result = await pool.query<UserType>(`SELECT * FROM public."User"`);
  return result.rows;
}
export async function createUserQuery({
  tel,
  name,
  email,
  gender,
  password,
}: CreateUserType) {
  const result = await pool.query<UserType>(
    `INSERT INTO public."User" (tel, name, email, gender, password) VALUES ($1, $2, $3, $4, $5) 
    RETURNING id, tel, name, email, gender`,
    [tel, name, email, gender, password]
  );
  return result.rows[0];
}
