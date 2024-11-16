import { config } from "dotenv";

config();

export const port = Number(process.env.DB_PORT!);
export const host = process.env.DB_HOST!;
export const user = process.env.DB_USER!;
export const database = process.env.DB_NAME!;
export const password = process.env.DB_PASSWORD!;
export const appPort = Number(process.env.APP_PORT!);
export const secret0 = process.env.AUTH_SECRET_KEY_0!;
export const secret1 = process.env.AUTH_SECRET_KEY_1!;
export const secret2 = process.env.AUTH_SECRET_KEY_2!;
export const secret3 = process.env.AUTH_SECRET_KEY_3!;
export const secret4 = process.env.AUTH_SECRET_KEY_4!;
export const secretPosition = Number(process.env.AUTH_SECRET_POSITION!);
