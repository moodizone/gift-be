import { Pool } from "pg";
import { user, host, database, port, password } from "./env";

export const pool = new Pool({
  // \du
  user,
  // hostname
  host,
  // \l
  database,
  // ALTER USER "my_app_user" WITH PASSWORD 'new_password';
  password,
  // netstat -plnt | grep postgres
  port,
});
