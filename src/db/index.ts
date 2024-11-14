import { Pool } from "pg";
import { config } from "dotenv";

config();

// netstat -plnt | grep postgres
const port = Number(process.env.DB_PORT!);
const host = process.env.DB_HOST!;
// \du
const user = process.env.DB_USER!;
// \l
const database = process.env.DB_NAME!;
// ALTER USER "my_app_user" WITH PASSWORD 'new_password';
const password = process.env.DB_PASSWORD!;

export const pool = new Pool({
  user,
  host,
  database,
  password,
  port,
});
