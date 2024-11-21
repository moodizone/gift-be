import { getUserByEmailQuery, getUsersQuery } from "../models/user";

export async function getUsersService() {
  return getUsersQuery();
}
export async function getUserByEmailService(email: string) {
  const result = await getUserByEmailQuery(email);
  return result;
}
