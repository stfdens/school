import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import responseApi from "../config/Response";
import { RequestAll, UserAccount } from "../interface/interfaceAllData";

export const jwtMiddleware = (
  req: RequestAll,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers?.authorization?.split(" ")[1];

  jwt.verify(
    token as string,
    `${process.env.SECRET_KEY}`,
    (error, result): void => {
      if (error) {
        return responseApi.ResponseData(res, 500, "FAILED", "INVALID TOKENS");
      }

      if (!result) {
        return responseApi.ResponseData(res, 500, "INVALID TOKEN");
      }

      next();
    }
  );
};
