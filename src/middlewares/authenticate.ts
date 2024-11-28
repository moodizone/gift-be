import express from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

import { extractSecret } from "../utils/auth";
import { RequestCustom } from "../types/server";

export async function authentication(
  req: RequestCustom,
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
      jwt.verify(result.token, result.secret, (err, decoded) => {
        // invalid token
        if (err || !decoded || typeof decoded === "string" || !decoded.id)
          res.status(error.statusCode).json({ message: error.message });
        // check expiration
        else if (!decoded.iat || !decoded.exp || decoded.iat >= decoded.exp) {
          res.status(error.statusCode).json({ message: error.message });
        } else {
          req.userId = Number(decoded.id);
          next();
        }
      });
    }
  }
}
