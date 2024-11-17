import { config } from "dotenv";

config();

export const appPort = Number(process.env.APP_PORT!);
export const secret0 = process.env.AUTH_SECRET_KEY_0!;
export const secret1 = process.env.AUTH_SECRET_KEY_1!;
export const secret2 = process.env.AUTH_SECRET_KEY_2!;
export const secret3 = process.env.AUTH_SECRET_KEY_3!;
export const secret4 = process.env.AUTH_SECRET_KEY_4!;
export const secretPosition = Number(process.env.AUTH_SECRET_POSITION!);
