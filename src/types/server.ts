import { Request } from "express";
import * as core from "express-serve-static-core";

export interface RequestCustom<O = core.ParamsDictionary> extends Request<O> {
  userId?: number;
}
