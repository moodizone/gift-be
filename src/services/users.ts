import { getUsersQuery } from "../models/users";

export async function getUsersService() {
  return getUsersQuery();
}
