import { Request } from "express";
import * as core from "express-serve-static-core";
import { UserUpdateBody } from "./index";

export interface RequestCustom<O = core.ParamsDictionary> extends Request<O> {
  userId?: number;
}
export interface UserUpdateQueryBody extends Omit<UserUpdateBody, "birthday"> {
  birthday: Date | null;
}
