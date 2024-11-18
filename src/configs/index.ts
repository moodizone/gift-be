import { config } from "dotenv";

config();

export const appPort = Number(process.env.APP_PORT!);
export const secret0 = process.env.SECRET_0!;
export const secret1 = process.env.SECRET_1!;
export const secret2 = process.env.SECRET_2!;
export const secret3 = process.env.SECRET_3!;
export const secret4 = process.env.SECRET_4!;
export const secretPosition = Number(process.env.SECRET_POSITION!);
