import { NextFunction, Request, Response } from "express";

export function checkToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (!req.session.token) {
    throw new Error("No token present");
  }

  next();
}

export function refreshTokenOnError(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // TODO: refresh token
}
