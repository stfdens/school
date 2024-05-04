import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import {
  CustomJwtPayload,
  RequestAll,
  UserAccount,
} from "../interface/interfaceAllData";
import responseApi from "../config/Response";

export const jwtMiddleware = (
  req: RequestAll,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token: string = req.headers?.authorization?.split(" ")[1] as string;

    if (!token) {
      return responseApi.ResponseData(res, 401, "FAILED", "NOT HAVE TOKEN");
    }

    const decodeToken = jwt.verify(
      token,
      process.env.SECRET_KEY as string
    ) as CustomJwtPayload;

    const user: UserAccount = {
      id: decodeToken.Id,
      username: decodeToken.Username,
      role: decodeToken.Role,
    };

    req.user = user;
    next();
  } catch (error) {
    return responseApi.ResponseData(res, 401, "FAILED", "INVALID TOKEN");
  }
};
