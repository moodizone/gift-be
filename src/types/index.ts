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
  cheap = "1",
  expensive = "2",
  commented = "3",
  new = "4",
}
export enum ProductRatingEnum {
  low = "1", // [0:2] stars
  medium = "2", // (2:4) stars
  high = "3", // [4:5] stars
}
export enum LimitEnum {
  few = '12',
  regular = '24',
  many = '48',
}
export interface ProductType {
  id: number;
  title: string;
  description: string | null;
  categoryId: number | null;
  stock: number | null;
  rating: number | null;
  discount: number | null;
  alt: string | null;
  pics: string[];
  price: number | null;
  rateCount: number | null;
  thumbnail: string | null;
  sourceLink: string | null;
}
export interface GetProductResponse {
  list: ProductType[];
  count: number;
}
