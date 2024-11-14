import { pool } from "../configs/db";
import { UserType } from "../types";

export async function getUsersQuery() {
  const result = await pool.query<UserType>(`SELECT * FROM public."User"`);
  return result.rows;
}
