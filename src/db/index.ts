import { Pool } from "pg";

// netstat -plnt | grep postgres
const port = 5432;
const host = "127.0.0.1";
// \du
const user = "gift-db"; //
// \l
const database = "Gift-Store";
// ALTER USER "my_app_user" WITH PASSWORD 'newpassword';
const password = "123456";

export const pool = new Pool({
  user,
  host,
  database,
  password,
  port,
});
