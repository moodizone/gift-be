import { gender, language } from "@prisma/client";

export interface ErrorType {
  message: string | Array<Record<string, string>>;
}
export interface AuthLoginBody {
  email: string;
  password: string;
}
export interface AuthLoginResponse {
  email: string;
  id: number;
  tel: string | null;
  firstName: string | null;
  lastName: string | null;
  gender: gender | null;
  birthday: string | null;
  profilePicture: string | null;
  token: string;
  language: language | null;
  bio: string | null;
  address: string | null;
}
export interface AuthRegisterBody {
  email: string;
  password: string;
}
export type AuthRegisterResponse = AuthLoginResponse;
export interface AuthEmailAvailabilityBody {
  email: string;
}
export interface UserUpdateBody {
  tel?: string;
  firstName?: string;
  lastName?: string;
  gender?: gender;
  birthday?: string;
  bio?: string;
  address?: string;
}
export type UserUpdateResponse = Omit<AuthLoginResponse, "token">;
export type UserMeResponse = Omit<AuthLoginResponse, "token">;
export type UserUpdatePasswordResponse = object;
export interface UserUpdatePasswordBody {
  oldPassword: string;
  newPassword: string;
}
export interface GetCategoryResponse {
  id: number;
  title: string;
  subCategories: number[];
  superCategory: number | null;
}
export enum ProductSortEnum {
  expensive = 1,
  cheap,
  commented,
  new,
}
export enum RatingEnum {
  low = 1,
  medium,
  high,
}
export enum PerPageEnum {
  few = 12,
  regular = 24,
  many = 48,
}
