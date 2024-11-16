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
export async function getUserByTelQuery(tel: string) {
  const result = await pool.query<UserType>(
    `SELECT * FROM public."User" WHERE tel = $1`,
    [tel]
  );
  return result.rows;
}
