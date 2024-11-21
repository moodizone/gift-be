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
  const error = createHttpError.Unauthorized();

  // if token not presented
  if (!rawToken) res.status(error.statusCode).json({ message: error.message });
  else {
    const result = extractSecret(rawToken);

    // invalid secret position
    if (!result) res.status(error.statusCode).json({ message: error.message });
    else {
      // invalid token
      jwt.verify(result.token, result.secret, (err, decoded) => {
        if (err || !decoded || typeof decoded === "string")
          res.status(error.statusCode).json({ message: error.message });
        // check expiration
        else if (decoded.iat && decoded.exp && decoded.iat <= decoded.exp) {
          // @ts-ignore --> attach userId to request
          req.userId = decoded;
          next();
        } else {
          res.status(error.statusCode).json({ message: error.message });
        }
      });
    }
  }
}
