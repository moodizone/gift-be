import { NextFunction, RequestHandler, Request, Response } from "express";

export function asyncHandler(
  fn: (req: Request<any>, res: Response, next: NextFunction) => Promise<unknown>
): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
