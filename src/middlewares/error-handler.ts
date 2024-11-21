import { ZodError } from "zod";
import httpErrors from "http-errors";
import { NextFunction, Response, Request } from "express";

export async function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  //=====================================
  // API error
  //=====================================
  if (err instanceof httpErrors.HttpError) {
    return res.status(err.status).json({
      message: err.message,
    });
  }
  //=====================================
  // Zod Error
  //=====================================
  else if (err instanceof ZodError) {
    return res.status(httpErrors.BadRequest().status).json({
      message: err.errors.map((e) => ({
        [e.path.join("-")]: e.message,
      })),
    });
  }

  //=====================================
  // Fallback
  //=====================================
  else {
    const error = httpErrors.InternalServerError();
    console.error("🚫 Default error handler:\n", err?.stack);
    res.status(error.statusCode).json({ message: error.message });
  }
}
