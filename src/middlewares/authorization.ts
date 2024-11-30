import { Response, NextFunction } from "express";
import createHttpError from "http-errors";

import { RequestCustom } from "../types/server";

export enum OwnershipEnum {
  user = "user",
  product = "user",
}

function checkAuthorization(ownership: OwnershipEnum) {
  return (req: RequestCustom<unknown>, res: Response, next: NextFunction) => {
    // injected based on user's token
    const userId = req.userId;

    // assume that user bypass authentication
    if (!userId) {
      const error = createHttpError.Unauthorized();
      res.status(error.status).json({ message: error.message });
    }

    const forbidden = createHttpError.Forbidden();

    // NOTE: all request's params were checked in upper middlewares (validateParams)
    // in terms of existence or type-safety
    switch (ownership) {
      case OwnershipEnum.user: {
        const requestedId = (req as RequestCustom<{ userId: number }>).params
          .userId;
        const convertToNumber = Number(requestedId);

        if (convertToNumber !== userId) {
          res.status(forbidden.status).json({ message: forbidden.message });
          return;
        }
      }
    }

    next();
  };
}
export const authorization = {
  user: checkAuthorization(OwnershipEnum.user),
  product: checkAuthorization(OwnershipEnum.product),
};
