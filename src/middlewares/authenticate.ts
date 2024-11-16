import express from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

import { extractSecret } from "../utils/auth";

export async function authentication(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const authHeader = req.headers["authorization"];
  const rawToken = authHeader && authHeader.split(" ")[1];

  // if token not presented
  if (!rawToken) res.sendStatus(createHttpError.Unauthorized().status);
  else {
    const result = extractSecret(rawToken);

    // invalid secret position
    if (!result) res.sendStatus(createHttpError.Unauthorized().status);
    else {
      // invalid token
      jwt.verify(result.token, result.secret, (err, decoded) => {
        if (err)
          return res.sendStatus(createHttpError.Unauthorized().statusCode);
        // attach userId to request
        // @ts-ignore
        req.userId = decoded;
        next();
      });
    }
  }
}
